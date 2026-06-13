
                  Internet
                      │
                      ▼
                Domain (DNS)
                      │
                      ▼
              Cloud VM Public IP
                      │
                      ▼
                Port 80 / 443
                      │
                      ▼
             Docker Container
          ┌─────────────────────┐
          │       Nginx         │
          │                     │
          │  Static Frontend    │
          │  HTML/CSS/JS Files  │
          └─────────────────────┘
                      │
                      ▼
                  Browser
