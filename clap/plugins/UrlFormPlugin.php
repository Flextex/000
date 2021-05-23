<?php

use Proxy\Plugin\AbstractPlugin;
use Proxy\Event\ProxyEvent;

class UrlFormPlugin extends AbstractPlugin {

	public function onCompleted(ProxyEvent $event){
	
		$request = $event['request'];
		$response = $event['response'];
		
		$url = $request->getUri();
		
		if(!is_html($response->headers->get('content-type'))){
			return;
		}
		$output = $response->getContent();
		$response->setContent($output);
	}
}

?>