package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"
)

func init() {

	err := godotenv.Load(".env")

	if err != nil {
		log.Fatal("Error loading .env file")
	}
}

func main() {
	var jsonData = []byte(`{
		"includedTypes": ["restaurant"],
		"maxResultCount": 10,
		"locationRestriction": {
		  "circle": {
			"center": {
			  "latitude":  44.8693646,
			  "longitude": -93.2652877
			},
			"radius": 1000.0
		  }
		}
	  }`)

	key := os.Getenv("KEY")
	fmt.Println(key)

	request, err := http.NewRequest("POST", "https://places.googleapis.com/v1/places:searchNearby", bytes.NewBuffer(jsonData))

	if err != nil {
		log.Error(err)
	}

	request.Header.Set("Content-Type", "application/json")

	request.Header.Set("X-Goog-Api-Key", key)

	request.Header.Set("X-Goog-FieldMask", "places.displayName,places.formattedAddress,places.types,places.websiteUri")

	client := &http.Client{}
	response, err := client.Do(request)
	if err != nil {
		panic(err)
	}
	defer response.Body.Close()

	fmt.Println("response Status:", response.Status)
	fmt.Println("response Headers:", response.Header)
	body, _ := io.ReadAll(response.Body)
	fmt.Println("response Body:", string(body))

	e := echo.New()

	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
	}))

	e.GET("/", func(c echo.Context) error {

		url := fmt.Sprintf("https://www.googleapis.com/geolocation/v1/geolocate?key=%s", key)

		resp, err := http.Post(url, "application/json", bytes.NewBuffer(jsonData))

		resp.Header.Set("Content-Type", "application/json")
		if err != nil {
			panic(err)
		}
		defer resp.Body.Close()

		fmt.Println("Response status:", resp.Status)

		body, _ = io.ReadAll(resp.Body)

		return c.String(http.StatusOK, string(body))

	})
	e.GET("/show", func(c echo.Context) error {
		team := c.QueryParam("team")
		member := c.QueryParam("member")

		return c.String(http.StatusOK, "team:"+team+"\n"+"member:"+" "+member)
	})
	e.Logger.Fatal(e.Start(":1234"))

}
