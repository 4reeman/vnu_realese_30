<?php

namespace Drupal\rest_api\Plugin\rest\resource;

use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Drupal\rest_api\NodeDataProviderInterface;
use Psr\Log\LoggerInterface;
use Symfony\Component\DependencyInjection\ContainerInterface;

/**
 * Provides a Demo Resource.
 *
 * @RestResource(
 *   id = "single_content",
 *   label = @Translation("Single Content"),
 *   uri_paths = {
 *     "canonical" = "/rest_api/node/{id}/{view_mode}"
 *   }
 * )
 */
class SingleContent extends ResourceBase {

  /**
   * Constructs a Drupal\rest_api\Plugin\rest\resource\ContentBundle object.
   *
   * @param array $configuration
   *   A configuration array containing information about the plugin instance.
   * @param string $plugin_id
   *   The plugin_id for the plugin instance.
   * @param mixed $plugin_definition
   *   The plugin implementation definition.
   * @param array $serializer_formats
   *   The available serialization formats.
   * @param \Psr\Log\LoggerInterface $logger
   *   A logger instance.
   * @param \Drupal\rest_api\NodeDataProviderInterface $nodeDataProvider
   *   NodeDataProvider instance.
   */
  public function __construct(
    array $configuration,
    $plugin_id,
    $plugin_definition,
    array $serializer_formats,
    LoggerInterface $logger,
    private readonly NodeDataProviderInterface $nodeDataProvider
  ) {
    parent::__construct($configuration, $plugin_id, $plugin_definition, $serializer_formats, $logger);
  }

  /**
   * {@inheritDoc}
   */
  public static function create(ContainerInterface $container, array $configuration, $plugin_id, $plugin_definition): static {
    return new static(
      $configuration,
      $plugin_id,
      $plugin_definition,
      $container->getParameter('serializer.formats'),
      $container->get('logger.factory')->get('rest'),
      $container->get('rest_api.node_data_provider')
    );
  }

  /**
   * Responds to entity GET requests.
   *
   * @param string $id
   *   Node id.
   * @param string $view_mode
   *   View Mode.
   */
  public function get(string $id, string $view_mode): ResourceResponse {
    $node_data = $this->nodeDataProvider;
    $node_data->loadNode($id);
    $node_data->setNodeDataStructure($view_mode);
    $response = new ResourceResponse($node_data->getStructuredData());
    $response->addCacheableDependency($response);
    return $response;
  }

}
