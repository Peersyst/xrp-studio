data "cloudflare_zone" "peersyst_tech" {
    name = var.dns_domain
}

resource "cloudflare_record" "www" {
    zone_id = data.cloudflare_zone.peersyst_tech.id
    name    = var.dns_subdomain
    value   = aws_instance.server.public_ip
    type    = "A"
    proxied = true
}
