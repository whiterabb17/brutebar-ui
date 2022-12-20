package main

import (
	"encoding/json"

	"github.com/asticode/go-astichartjs"
	"github.com/asticode/go-astilectron"
	bootstrap "github.com/asticode/go-astilectron-bootstrap"
)

type AttackConfig struct {
	PathToUserPassList string `json:"userpasslist"`
	PathToUserList     string `json:"userlist"`
	PathToPassList     string `json:"passlist"`
	Threads            string `json:"threads"`
	Target             string `json:"ip"`
	Port               string `json:"port"`
	Protocal           string `json:"protocol"`
}

// handleMessages handles messages
func handleMessages(_ *astilectron.Window, m bootstrap.MessageIn) (payload interface{}, err error) {
	switch m.Name {
	case "start":
		// Unmarshal payload
		var path string
		if len(m.Payload) > 0 {
			// Unmarshal payload
			if err = json.Unmarshal(m.Payload, &path); err != nil {
				payload = err.Error()
				return
			}
		}

		payload = "initokay" //"Initialized Successfully"
		// Explore
		// if payload, err = explore(path); err != nil {
		// 	payload = err.Error()
		// 	return
		// }
	case "attack_start":
		// Unmarshal payload
		var config AttackConfig
		if len(m.Payload) > 0 {
			// Unmarshal payload
			if err = json.Unmarshal(m.Payload, &config); err != nil {
				payload = err.Error()
				return
			}
			go SshBrute(config.PathToUserPassList, config.Target, "2", "30")
			payload = "startedattack"
		} else {
			payload = "valuesrequired"
		}
	case "attack_stop":
		// Unmarshal payload
		var path string
		if len(m.Payload) > 0 {
			// Unmarshal payload
			if err = json.Unmarshal(m.Payload, &path); err != nil {
				payload = err.Error()
				return
			}
		}
		payload = "stoppedattck" //"Initialized Successfully"
		// Explore
		// if payload, err = explore(path); err != nil {
		// 	payload = err.Error()
		// 	return
		// }
	}
	return
}

// Exploration represents the results of an exploration
type Exploration struct {
	Dirs       []Dir              `json:"dirs"`
	Files      *astichartjs.Chart `json:"files,omitempty"`
	FilesCount int                `json:"files_count"`
	FilesSize  string             `json:"files_size"`
	Path       string             `json:"path"`
}

// PayloadDir represents a dir payload
type Dir struct {
	Name string `json:"name"`
	Path string `json:"path"`
}
