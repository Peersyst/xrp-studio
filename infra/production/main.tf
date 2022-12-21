terraform {
    cloud {
        hostname     = "app.terraform.io"
        organization = "Peersyst"
        workspaces {
            name = "xrp-studio_production"
        }
    }

    required_providers {
        aws = {
            source  = "hashicorp/aws"
            version = "~> 3.27"
        }
        cloudflare = {
            source  = "cloudflare/cloudflare"
            version = "~> 3.0"
        }
    }
    required_version = ">= 0.14.9"
}

data "aws_secretsmanager_secret" "secrets" {
    name = "production/${var.project_name}"
}

data "aws_secretsmanager_secret_version" "current" {
    secret_id = data.aws_secretsmanager_secret.secrets.id
}

provider "aws" {
    profile = "default"
    region  = var.aws_region
}

provider "cloudflare" {
    api_token = var.CLOUDFLARE_TOKEN
}

output "url" {
    value = "https://${cloudflare_record.www.hostname}"
}

output "server_ip" {
    value = aws_instance.server.public_ip
}
