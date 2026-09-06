# Cloud-Native Stock Trading Platform

A full-stack stock trading platform built to demonstrate **microservices, real-time market data, secure authentication, Docker, and Kubernetes**.

## 🚀 Features

- JWT-based authentication
- Stock CRUD and simulated price updates
- BUY/SELL order workflow
- User-specific holdings and positions
- Real-time market updates with Socket.IO
- API Gateway for service routing
- MongoDB persistence
- Docker & Docker Compose
- Kubernetes + Minikube
- NGINX Ingress
- GitHub Actions CI/CD

## 🏗️ Architecture

```text
React Frontend / Dashboard
          ↓
     NGINX Ingress
          ↓
      API Gateway
          ↓
 ┌────────┼────────┬────────┐
 ↓        ↓        ↓        ↓
Auth  Portfolio   Order   Stock
          │        │        │
          └────────┼────────┘
                   ↓
                MongoDB

Stock Service → Socket.IO → Dashboard
```

## 🛠️ Technology Stack

**Frontend:** React  
**Backend:** Node.js, Express  
**Database:** MongoDB, Mongoose  
**Authentication:** JWT, bcrypt, HttpOnly cookies  
**Real-Time:** Socket.IO  
**Gateway:** http-proxy-middleware  
**Containers:** Docker, Docker Compose  
**Orchestration:** Kubernetes, Minikube  
**Ingress:** NGINX  
**CI/CD:** GitHub Actions  

## 📁 Main Structure

```text
backend/
  services/
    api-gateway/
    auth-service/
    portfolio-service/
    order-service/
    stock-service/

frontend/       # Public website
dashboard/      # Trading UI
k8s/            # Kubernetes resources
k8s-microservices/
docker-compose.yml
docker-compose.microservices.yml
```

## 🔌 API Gateway

| Route | Service |
|---|---|
| `/api/auth` | Auth |
| `/api/portfolio` | Portfolio |
| `/api/orders` | Order |
| `/api/stocks` | Stock |

Gateway runs on **8080**.

## ⚡ Real-Time Market Flow

```text
Market Simulator
      ↓
Update MongoDB
      ↓
Socket.IO
      ↓
MarketContext
      ↓
React Dashboard
```

Stock prices are simulated locally for learning; this is **not a real financial market feed**.

## 🔐 Security

Current/target security direction:

- JWT authentication
- HttpOnly cookies
- `SameSite=Lax`
- Secure cookies in production
- Explicit CORS origins
- Protected user-specific resources

Security hardening is still being developed.

## 🐳 Run Locally

### Docker Compose

```bash
docker compose -f docker-compose.microservices.yml up --build
```

### Development ports

```text
Frontend   → 3000
Dashboard  → 3005
Gateway    → 8080
Auth       → 3001
Portfolio  → 3002
Order      → 3003
Stock      → 3004
```

## ☸️ Kubernetes

The project can be deployed locally with:

```text
Docker → Minikube → Kubernetes → NGINX Ingress
```

Ingress testing uses the local host:

```text
trading.local
```

## 🧪 Testing

APIs can be tested with Thunder Client.

Important checks:

```text
GET  /health
POST /api/auth/signup
POST /api/auth/login
GET  /api/stocks
GET  /api/portfolio/holdings
GET  /api/portfolio/positions
```

Socket.IO can be verified using the included socket test client.

## 🔮 Future Roadmap

Next we plan to implement:

1. **Complete authentication hardening** — `/me`, logout, CSRF protection, rate limiting
2. **Complete trading engine** — SELL, balances, order states, order history
3. **Better portfolio analytics** — P&L, valuation, allocation
4. **Redis** — caching and distributed real-time events
5. **Testing & observability** — integration tests, Prometheus, Grafana, OpenTelemetry
6. **Kubernetes scaling** — HPA, resource limits, secrets, rolling updates
7. **Advanced trading** — limit orders, stop-loss, market hours
8. **Production-style CI/CD and security hardening**

## 🎯 Project Goal

The goal is to evolve the application from a working full-stack project into a **secure, observable, scalable cloud-native trading platform** while learning each technology step by step.

## 💼 Resume

**Cloud-Native Stock Trading Platform** — Node.js, Express, React, MongoDB, Docker, Kubernetes, Socket.IO

- Built a microservices-based stock trading platform with API Gateway, authentication, Order, Portfolio, and Stock services.
- Implemented simulated real-time market updates using Socket.IO and a React trading dashboard.
- Containerized and deployed services using Docker, Kubernetes, Minikube, and NGINX Ingress.
- Implemented user-specific portfolio management and service-to-service trading workflows.
