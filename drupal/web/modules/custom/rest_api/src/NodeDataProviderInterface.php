<?php

namespace Drupal\rest_api;

/**
 * Provides an interface defining an api structured data array.
 */
interface NodeDataProviderInterface {

  /**
   * Load Node by id.
   *
   * @param string $id
   *   Node id.
   */
  public function loadNode(string $id);

  /**
   * Create divided field groups (base_fields, config_fields).
   *
   *  Value for config fields group
   * will be set only if it exists for selected view mode.
   *
   * @param string $view_mode
   *   Route parameter view mode.
   */
  public function setNodeDataStructure(string $view_mode);

  /**
   * Getter of NodeDataProvider.
   *
   * @return array|null
   *   Structured array of values of node`s fields.
   */
  public function getStructuredData(): array|null;

}
