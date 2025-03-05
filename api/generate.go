package generate

//go:generate protoc ./shop/shop.proto --go_out=../gen/go/ --go_opt=paths=source_relative --go-grpc_out=../gen/go/ --go-grpc_opt=paths=source_relative
//go:generate protoc ./auth/auth.proto --go_out=../gen/go/ --go_opt=paths=source_relative --go-grpc_out=../gen/go/ --go-grpc_opt=paths=source_relative
//go:generate protoc --js_out=import_style=commonjs,binary:../client/src/grpc --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../client/src/grpc auth/auth.proto
//go:generate protoc --js_out=import_style=commonjs,binary:../client/src/grpc --grpc-web_out=import_style=commonjs,mode=grpcwebtext:../client/src/grpc shop/shop.proto
