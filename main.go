package main

import (
	"context"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/kr/pretty"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"googlemaps.github.io/maps"
)

type AutoGenerated struct {
	Places []struct {
		Types            []string `json:"types"`
		FormattedAddress string   `json:"formattedAddress"`
		DisplayName      struct {
			Text         string `json:"text"`
			LanguageCode string `json:"languageCode"`
		} `json:"displayName"`
	} `json:"places"`
}

func init() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	key := os.Getenv("KEY")

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.GET("/", func(c echo.Context) error {

		z, err := maps.NewClient(maps.WithAPIKey(key))

		if err != nil {
			log.Fatalf("fatal error: %s", err)
		}
		r := &maps.GeolocationRequest{ConsiderIP: true}

		route, err := z.Geolocate(context.Background(), r)
		if err != nil {
			log.Fatalf("fatal error: %s", err)
		}

		s := &maps.NearbySearchRequest{Location: &route.Location, Radius: 5000, Type: "restaurant"}

		ts := &maps.TextSearchRequest{Query: "asian_restaurants", Location: &route.Location, Radius: 4000}

		t, err := z.TextSearch(context.Background(), ts)
		if err != nil {
			log.Error(err)
		}
		quess, err := z.NearbySearch(context.Background(), s)
		if err != nil {
			log.Error(err)
		}

		pretty.Println(quess)
		pretty.Println(t)

		return c.JSON(http.StatusOK, t)

	})

	e.GET("/search", func(c echo.Context) error {
		name := c.QueryParam("name")

		z, err := maps.NewClient(maps.WithAPIKey(key))

		if err != nil {
			panic(err)
		}

		r := &maps.GeolocationRequest{ConsiderIP: true}

		route, err := z.Geolocate(context.Background(), r)

		if err != nil {
			log.Fatalf("fatal error: %s", err)
		}

		ts := &maps.TextSearchRequest{Query: name, Location: &route.Location, Radius: 3000}

		t, err := z.TextSearch(context.Background(), ts)

		if err != nil {
			log.Error(err)
		}

		return c.JSON(http.StatusOK, t)
	})

	e.Logger.Fatal(e.Start(":1235"))

}
