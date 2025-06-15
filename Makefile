CLUSTER_ID=MsGbTKdFSwyjFoKxflCVnA
IMAGE=confluentinc/cp-kafka:7.4.0

format-kafka:
	docker run --rm \
		-v "$(PWD)/kafka-data:/var/lib/kafka/data" \
		-v "$(PWD)/server.properties:/etc/kafka/server.properties" \
		$(IMAGE) \
		kafka-storage format \
		--cluster-id $(CLUSTER_ID) \
		--config /etc/kafka/server.properties

docker-up:
	docker compose -f docker-compose.yml up --build