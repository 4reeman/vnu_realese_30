<?php

namespace Drupal\rest_api\Plugin\rest\resource;

use Drupal\rest_api\NodeDataProviderInterface;
use Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException;
use Drupal\Component\Plugin\Exception\PluginNotFoundException;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\rest\Plugin\ResourceBase;
use Drupal\rest\ResourceResponse;
use Psr\Log\LoggerInterface;

/**
 * Provides a Node`s fields structured array.
 *
 * @RestResource(
 *   id = "content_bundle",
 *   label = @Translation("Content Bundle"),
 *   uri_paths = {
 *     "canonical" = "/rest_api/{bundle}/{view_mode}/{quantity}/{langcode}"
 *   }
 * )
 */
class ContentBundle extends ResourceBase {
  /**
   * Queried nids.
   *
   * @var array
   */
  private array $nids;

  /**
   * Taxonomy term`s machine names of Department vocabulary.
   *
   * @var array
   */
  private array $terms;

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
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   EntityTypeManager instance.
   * @param \Drupal\rest_api\NodeDataProviderInterface $nodeDataProvider
   *   NodeDataProvider instance.
   */
  public function __construct(
    array $configuration,
          $plugin_id,
          $plugin_definition,
    array $serializer_formats,
    LoggerInterface $logger,
    protected EntityTypeManagerInterface $entityTypeManager,
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
      $container->get('entity_type.manager'),
      $container->get('rest_api.node_data_provider')
    );
  }

//  /**
//   * Machine Names from Term Label.
//   *
//   *   Create Array from terms machine_name => tid.
//   *
//   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
//   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
//   */
//  private function termMachineName(): void {
//    $vid = 'department';
//    $terms = $this->entityTypeManager->getStorage('taxonomy_term')->loadByProperties(['vid' => $vid]);
//    foreach ($terms as $term) {
//      $label = strtolower($term->label());
//      $exp = explode(' ', $label);
//      $imp = implode('_', $exp);
//      $this->terms[$imp] = $term->id();
//    }
//  }

  /**
   * Get all Node`s id by tid, bundle and limit sample by Nodes quantity.
   *
   *  Sorted by last modified date (DESC).
   *
   * @param string $bundle
   *   Node`s Bundle.
   * @param int $quantity
   *   Quantity of nodes to return.
   */
  private function getNids(string $bundle, int $quantity): void {
    $query = \Drupal::entityQuery('node')
      ->accessCheck()
      ->condition('status', 1)
      ->condition('type', $bundle)
      ->sort('changed', 'DESC')
      ->range(0, $quantity)
      ->execute();
    $this->nids = $query;
  }

  /**
   * Responds to entity GET requests.
   *
   * @param string $bundle
   *   Node`s Bundle.
   * @param string $view_mode
   *   View Mode.
   * @param int $quantity
   *   Quantity of nodes to return.
   * @param string $langcode
   *   Language.
   *
   * @throws \ErrorException
   */
  public function get(string $bundle, string $view_mode, int $quantity, string $langcode): ResourceResponse {
    try {
//      $this->termMachineName();
//      if (!array_key_exists($site_name, $this->terms)) {
//        throw new \ErrorException('Invalid param:' . $site_name);
//      }
//      $tid = $this->terms[$site_name];
      $this->getNids($bundle, $quantity);
      $node_data = $this->nodeDataProvider;
      foreach ($this->nids as $nid) {
        $node_data->loadNode($nid, $langcode);
        $node_data->setNodeDataStructure($view_mode, $langcode);
      }
    }
    catch (InvalidPluginDefinitionException | PluginNotFoundException $e) {
      return new ResourceResponse(['message' => $e]);
    }
    $response = new ResourceResponse($this->nodeDataProvider->getStructuredData());
    $response->addCacheableDependency($response);
    return $response;
  }

}
