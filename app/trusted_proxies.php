<?php

use Symfony\Component\HttpFoundation\Request;

$trustedProxies = [
    // Cloudflare
    '103.21.244.0/22',
    '103.22.200.0/22',
    '103.31.4.0/22',
    '104.16.0.0/12',
    '108.162.192.0/18',
    '131.0.72.0/22',
    '141.101.64.0/18',
    '162.158.0.0/15',
    '172.64.0.0/13',
    '173.245.48.0/20',
    '188.114.96.0/20',
    '190.93.240.0/20',
    '197.234.240.0/22',
    '198.41.128.0/17',
    '199.27.128.0/21',
    '2400:cb00::/32',
    '2405:8100::/32',
    '2405:b500::/32',
    '2606:4700::/32',
    '2803:f800::/32',
    '2c0f:f248::/32',
    '2a06:98c0::/29',
    // Google Cloud Platform
    '130.211.0.0/22',
    '35.191.0.0/16',
];

// Google Load Balancer
if (!empty($_SERVER['GCLOUD_LB_IP'])) {
    $trustedProxies[] = $_SERVER['GCLOUD_LB_IP'];
}

Request::setTrustedProxies($trustedProxies, Request::HEADER_X_FORWARDED_ALL);
