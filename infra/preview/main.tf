terraform {
    cloud {
        hostname     = "app.terraform.io"
        organization = "Peersyst"
        workspaces {
            name = "__WORKSPACE__"
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

provider "aws" {
    profile = "default"
    region  = var.aws-region
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
