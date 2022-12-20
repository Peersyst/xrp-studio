variable "CLOUDFLARE_TOKEN" {
    sensitive = true
}

variable "DOCKER_READONLY_TOKEN" {
    sensitive = true
}

variable "SSH_PRIVATE_KEY" {
    sensitive = true
}

variable "dns_domain" {
    default = "peersyst.tech"
}

variable "dns_subdomain" {
    default = "xrp-studio_production"
}

variable "aws_region" {
    default = "eu-west-1"
}

variable "project_name" {
    type = string
}
