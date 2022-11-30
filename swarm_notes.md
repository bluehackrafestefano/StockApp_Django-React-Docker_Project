docker swarm init
```
Swarm initialized: current node (cjtdd6wcedd6o352tahcb8m9i) is now a manager.

To add a worker to this swarm, run the following command:

    docker swarm join --token SWMTKN-1-09d8o9vaklxtqensuescudlrgn81oo2af69sa3xjtne5wqodoy-a7kta87osgkuzawaff391a9dt 192.168.65.3:2377

To add a manager to this swarm, run 'docker swarm join-token manager' and follow the instructions.
```

- SSH into the instance and use the command to add this machine to the swarm

docker info

- look at swarm part

```
Swarm: active
  NodeID: cjtdd6wcedd6o352tahcb8m9i
  Is Manager: true
  ClusterID: m189ochqm67uve0zkfztrrbl1
  Managers: 1
  Nodes: 1
  Default Address Pool: 10.0.0.0/8
  SubnetSize: 24
  Data Path Port: 4789
  Orchestration:
   Task History Retention Limit: 5
```

docker node ls

- how to add docker compose stack to the swarm

- go to same level with docker compose


https://docs.docker.com/engine/reference/commandline/stack_deploy/

--compose-file , -c		Path to a Compose file, or "-" to read from stdin

docker stack deploy --compose-file docker-compose.yml vossibility  # example

docker stack deploy -c docker-compose.yml <stackName>

Note: When you run the docker stack deploy from the compose file. You need to mention the image name as well when building it from Dockerfile.

docker stack rm <stackName>


# add a service to the stack
docker service create --replicas 1 --name nodeserver2 node ping docker.com


docker service ls
docker service logs [OPTIONS] SERVICE|TASK
docker service logs --details <service>

--details		Show extra details provided to logs
--follow , -f		Follow log output