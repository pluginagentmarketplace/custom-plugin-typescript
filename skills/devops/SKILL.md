---
name: devops-operations
description: Master containerization, Kubernetes, CI/CD pipelines, cloud platforms (AWS, GCP, Azure), and infrastructure automation. Use this skill when deploying applications, managing infrastructure, setting up automation, or handling cloud operations.
---

# DevOps & Operations Skill

## Quick Start

### Docker Basics
```dockerfile
# Dockerfile - Node.js application
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000
CMD ["node", "server.js"]

# Build image
# docker build -t myapp:1.0 .

# Run container
# docker run -p 3000:3000 myapp:1.0
```

### Kubernetes Deployment
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  replicas: 3
  selector:
    matchLabels:
      app: myapp
  template:
    metadata:
      labels:
        app: myapp
    spec:
      containers:
      - name: myapp
        image: myapp:1.0
        ports:
        - containerPort: 3000
        resources:
          requests:
            cpu: 100m
            memory: 128Mi
          limits:
            cpu: 500m
            memory: 512Mi
```

### GitHub Actions CI/CD
```yaml
name: Build and Deploy
on:
  push:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm test
      - run: npm run build
      - name: Deploy
        run: |
          docker build -t myapp:${{ github.sha }} .
          docker push myregistry/myapp:${{ github.sha }}
```

## Core Technologies

### Containerization
- **Docker**: Images, containers, registries, networking
- **Container Security**: Image scanning, root user avoidance, secrets management
- **Multi-stage Builds**: Optimizing image size, build caching
- **Docker Compose**: Local development, multi-container setup

### Orchestration
```yaml
# Kubernetes namespaces
apiVersion: v1
kind: Namespace
metadata:
  name: production

---
# Service for load balancing
apiVersion: v1
kind: Service
metadata:
  name: myapp-service
  namespace: production
spec:
  selector:
    app: myapp
  ports:
  - protocol: TCP
    port: 80
    targetPort: 3000
  type: LoadBalancer
```

### CI/CD Platforms
- **GitHub Actions**: Native to GitHub, free, good documentation
- **GitLab CI**: Kubernetes-native, excellent runner support
- **Jenkins**: Extensible, on-premise, self-hosted
- **CircleCI**: Cloud-based, fast, good Docker support
- **Travis CI**: Simple configuration, GitHub integration

### Cloud Platforms

#### AWS
```bash
# Deploy to EC2
aws ec2 run-instances --image-id ami-12345 --instance-type t3.micro

# S3 bucket operations
aws s3 cp myfile.txt s3://mybucket/

# RDS database
aws rds create-db-instance --db-instance-identifier mydb \
  --db-instance-class db.t3.micro --engine postgres
```

#### GCP
```bash
# Deploy to Cloud Run
gcloud run deploy myapp --source . --platform managed

# Create Compute Engine instance
gcloud compute instances create myinstance \
  --image-family=debian-11 --image-project=debian-cloud

# Cloud Storage
gsutil cp myfile.txt gs://mybucket/
```

#### Azure
```bash
# Deploy to App Service
az webapp up --name myapp --resource-group mygroup

# Create VM
az vm create --resource-group mygroup --name myvm \
  --image UbuntuLTS

# Create storage account
az storage account create --name mystorageacct \
  --resource-group mygroup
```

## Infrastructure as Code

### Terraform
```hcl
terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = "us-east-1"
}

resource "aws_instance" "web" {
  ami           = "ami-12345"
  instance_type = "t3.micro"

  tags = {
    Name = "web-server"
  }
}

resource "aws_security_group" "web" {
  name = "web-sg"
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}
```

### Ansible Configuration
```yaml
---
- name: Configure web servers
  hosts: webservers
  tasks:
    - name: Update package cache
      apt:
        update_cache: yes

    - name: Install Node.js
      apt:
        name: nodejs
        state: present

    - name: Deploy application
      git:
        repo: 'https://github.com/user/app.git'
        dest: /opt/myapp
        version: main
```

## Monitoring & Logging

### Prometheus Monitoring
```yaml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'prometheus'
    static_configs:
      - targets: ['localhost:9090']

  - job_name: 'application'
    static_configs:
      - targets: ['localhost:3000']
```

### ELK Stack (Elasticsearch, Logstash, Kibana)
```yaml
# docker-compose.yml
version: '3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:8.0.0
    environment:
      - discovery.type=single-node

  logstash:
    image: docker.elastic.co/logstash/logstash:8.0.0
    volumes:
      - ./logstash.conf:/usr/share/logstash/pipeline/logstash.conf

  kibana:
    image: docker.elastic.co/kibana/kibana:8.0.0
    ports:
      - "5601:5601"
```

## Security Hardening

### Network Security
```yaml
# Kubernetes Network Policy
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all-ingress
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          role: frontend
    ports:
    - protocol: TCP
      port: 3000
```

### Secrets Management
```bash
# Store secrets in environment
export DB_PASSWORD=$(kubectl get secret mysecret -o jsonpath='{.data.password}' | base64 -d)

# Kubernetes secrets
kubectl create secret generic db-secret \
  --from-literal=password=mypassword

# HashiCorp Vault
vault kv put secret/myapp/database password=mypassword
```

## Performance & Optimization

### Container Optimization
```dockerfile
# Multi-stage build - reduces final image size
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
CMD ["node", "server.js"]
```

### Load Balancing
```yaml
# Kubernetes Ingress for load balancing
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: myapp-ingress
spec:
  ingressClassName: nginx
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: myapp-service
            port:
              number: 80
```

## Best Practices

1. **Automation**: Automate everything - builds, tests, deployments
2. **Infrastructure as Code**: Version control your infrastructure
3. **Monitoring**: Monitor applications and infrastructure continuously
4. **Security**: Scan images, manage secrets, apply least privilege
5. **Disaster Recovery**: Regular backups, failover procedures
6. **Documentation**: Keep runbooks and playbooks updated
7. **Versioning**: Tag releases, maintain changelog
8. **Cost Optimization**: Monitor cloud spending, use spot instances

## Resources

- [Docker Documentation](https://docs.docker.com/)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Terraform Documentation](https://www.terraform.io/docs)
- [AWS Documentation](https://docs.aws.amazon.com/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Ansible Documentation](https://docs.ansible.com/)
