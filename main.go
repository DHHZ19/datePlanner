package main

import (
	"bytes"
	"context"
	"encoding/base64"
	"image/jpeg"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/kr/pretty"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
	"googlemaps.github.io/maps"
)

var (
	KEY string
)

func init() {

	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Error loading .env file")
	}

	KEY = os.Getenv("KEY")
}

func getAllData(c echo.Context) error {

	z, err := maps.NewClient(maps.WithAPIKey(KEY))
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

}

func getRestaurants(c echo.Context) error {

	restaurant := c.QueryParam("restaurant")

	z, err := maps.NewClient(maps.WithAPIKey(KEY))
	if err != nil {
		panic(err)
	}

	r := &maps.GeolocationRequest{ConsiderIP: true}

	route, err := z.Geolocate(context.Background(), r)
	if err != nil {
		log.Fatalf("fatal error: %s", err)
	}

	ts := &maps.TextSearchRequest{Query: restaurant, Location: &route.Location, Radius: 2000, Type: "restaurant"}

	t, err := z.TextSearch(context.Background(), ts)
	if err != nil {
		log.Error(err)
	}

	type Place struct {
		Name       string  `json:"Name"`
		Image      string  `json:"Image"`
		PlaceID    string  `json:"PlaceID"`
		PriceLevel int     `json:"PriceLevel"`
		Rating     float32 `json:"Rating"`
	}

	type PlacesData struct {
		Places []*Place `json:"Places"`
	}

	var pls []*Place // an array of places structs
	for i := 0; i < len(t.Results); i++ {
		if t.Results[i].Photos != nil {

			p := &maps.PlacePhotoRequest{PhotoReference: t.Results[i].Photos[0].PhotoReference, MaxHeight: 200, MaxWidth: 200}

			photo, err := z.PlacePhoto(context.Background(), p)
			if err != nil {
				log.Fatalf("Fatal Error: %s", err)
			}

			img, err := photo.Image()
			if err != nil {
				log.Errorf("Fatal Error: %s", err) // should be fatal but keep it errorf to keep program running
				continue
			}

			buffer := new(bytes.Buffer)
			if err := jpeg.Encode(buffer, img, nil); err != nil {
				log.Fatal("unable to encode image.")
			}
			str := base64.StdEncoding.EncodeToString(buffer.Bytes())
			encodedImage := str
			pls = append(pls, &Place{Name: t.Results[i].Name, Image: encodedImage, PlaceID: t.Results[i].PlaceID, PriceLevel: t.Results[i].PriceLevel, Rating: t.Results[i].Rating})
		}
	}
	//pretty.Printf("%s\n", data)

	return c.JSON(http.StatusOK, PlacesData{Places: pls})
}

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.Use(middleware.Logger())
	// comment out not sure what it does but seems self expanatory
	// e.Use(middleware.Recover())

	// Routes
	e.GET("/", getAllData)
	e.GET("/search", getRestaurants)

	e.Logger.Fatal(e.Start(":1235"))
}
