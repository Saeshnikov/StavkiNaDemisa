package tests

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
	"testing"
)

func TestMain(t *testing.T) {
	// err := getUserInfo()
	// if err != nil {
	// 	t.Fatal(err.Error())
	// }
	// err = postEvent()
	// if err != nil {
	// 	t.Fatal(err.Error())
	// }
	// err = getOpenEvent()
	// if err != nil {
	// 	t.Fatal(err.Error())
	// }
	// err = postBet()
	// if err != nil {
	// 	t.Fatal(err.Error())
	// }
	// err = getBet()
	// if err != nil {
	// 	t.Fatal(err.Error())
	// }
	// err = putEvent()
	// if err != nil {
	// 	t.Fatal(err.Error())
	// }
	err := putLogin()
	if err != nil {
		t.Fatal(err.Error())
	}
	// err = getClosedEvent()
	// if err != nil {
	// 	t.Fatal(err.Error())
	// }
}

func getUserInfo() error {
	var jsonStr = []byte(`{"secret_code":"code2"}`)
	client := &http.Client{}
	req, err := http.NewRequest("GET", "http://192.168.0.247:8080/user", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", bodyText)
	return nil
}

func postEvent() error {
	var jsonStr = []byte(`{ "sname" : "event1" , "sdescription" : "description" }`)
	client := &http.Client{}
	req, err := http.NewRequest("POST", "http://192.168.0.247:8080/event", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", bodyText)
	return nil
}

func getOpenEvent() error {
	var jsonStr = []byte(`{ "is_open" : true }`)
	client := &http.Client{}
	req, err := http.NewRequest("GET", "http://192.168.0.247:8080/event", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", bodyText)
	return nil
}

func getClosedEvent() error {
	var jsonStr = []byte(`{ "is_open" : false }`)
	client := &http.Client{}
	req, err := http.NewRequest("GET", "http://192.168.0.247:8080/event", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", bodyText)
	return nil
}

func putEvent() error {
	var jsonStr = []byte(`{ "id" : 1 , "result" : true }`)
	client := &http.Client{}
	req, err := http.NewRequest("PUT", "http://192.168.0.247:8080/event", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", bodyText)
	return nil
}

func putLogin() error {
	var jsonStr = []byte(`{ "password" : "artem" }`)
	client := &http.Client{}
	req, err := http.NewRequest("PUT", "http://localhost:3001/api/login", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", bodyText)
	return nil
}

func postBet() error {
	var jsonStr = []byte(`{ "sid" : 1 , "secret_code" : "code1" , "prediction" : true , "size" : 50 }`)
	client := &http.Client{}
	req, err := http.NewRequest("POST", "http://192.168.0.247:8080/bet", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", bodyText)
	return nil
}

func getBet() error {
	var jsonStr = []byte(`{ "secret_code" : "code1" }`)
	client := &http.Client{}
	req, err := http.NewRequest("GET", "http://192.168.0.247:8080/bet", bytes.NewBuffer(jsonStr))
	req.Header.Set("Content-Type", "application/json")
	if err != nil {
		return err
	}
	resp, err := client.Do(req)
	if err != nil {
		return err
	}

	defer resp.Body.Close()
	bodyText, err := io.ReadAll(resp.Body)
	if err != nil {
		return err
	}
	fmt.Printf("%s\n", bodyText)
	return nil
}
