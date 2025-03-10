package storage

type User struct {
	ID       int
	Login    string
	PassHash []byte
}
