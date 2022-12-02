minikube start
kubectl cluster-info

kubectl get nodes
kubectl get node
kubectl get no

kubectl get namespaces
kubectl get pods -A
kubectl get pods -n kube-system
kubectl get pods/nginx-pod -o yaml
kubectl get services -A

kubectl get namespaces
kubectl get ns
kubectl apply -f namespaces.yml
kubectl delete -f namespaces.yml
kubectl delete -f deployment.yml

docker container ls

kubectl api-resources
kubectl explain nodes
kubectl e


# Deployment

A Deployment provides declarative updates for Pods and ReplicaSets.

You describe a desired state in a Deployment, and the Deployment Controller changes the actual state to the desired state at a controlled rate. You can define Deployments to create new ReplicaSets, or to remove existing Deployments and adopt all their resources with new Deployments.

# Kubernetes Objects:

The Kubernetes Platform contains control over the resources related to Storage and Compute. These resources are regarded as Objects, and it contains 8 Key objects.

1. Pods:

Being a higher-level abstraction grouping containerized component, it consists of one or more containers that can co-exist on the host system and share resources. With each Pod having a unique IP Address in a particular cluster, it allows the usage of ports without any conflicts.

2. Replica Sets:

At any time, it is needed to maintain a stable set of running replica Pods. This is maintained by Replica sets. Also, its purpose is to manage the availability of the required number of identical Pods.

3. Services:

A Kubernetes service is defined by a set of pods that work together. These sets of pods are defined with a label selector. The service discovery can happen in two different modes, using environmental variables or Kubernetes DNS.

4. Volumes:

By default, ephemeral storage will be provided by the File Systems of Kubernetes. This form of storage will remove all the data stored in such containers when the Pod is restarted. The Kubernetes Volume will provide persistent storage such that the data exists for the whole lifetime of the Pod.

5. Name Spaces:

The large number of resources managed by Kubernetes are separated into multiple non-overlapping sets. These sets are referred to as Namespaces. These are generally used when a large number of users exist in the form of multiple teams or projects.

6. ConfigMaps and Secrets:

Some of the Configuration Data may contain confidential information which makes the storage and maintenance of configuration information a challenge. ConfigMaps and Secrets are two mechanisms provided by Kubernetes that can deal with this problem. Both methods permit changes in the configuration without application-build.

7. Stateful Sets:

Stateless applications are easier to handle in terms of scaling. Because all it needs is to add up the number of Pods. But for Stateful workloads, you need to maintain the states when the Pod is restarted, and the state may need to be redistributed for scaling. The stateful sets provided by Kubernetes are used to run stateful Applications ensuring uniqueness and ordering of the instances of a Pod.

8. Daemon Sets:

Generally, Kubernetes Scheduler is responsible for deciding the location where Pods are run. It is done by the algorithm. This mode of scheduling the Pods is implemented by the feature called Daemon Sets.