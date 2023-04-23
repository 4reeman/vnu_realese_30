<?php

namespace Drupal\rest_api;

use Drupal\breakpoint\BreakpointManagerInterface;
use Drupal\Core\Entity\EntityFieldManagerInterface;
use Drupal\Core\Entity\EntityTypeManagerInterface;
use Drupal\Core\Logger\RfcLogLevel;
use Drupal\responsive_image\Entity\ResponsiveImageStyle;

/**
 * Prepare Node Data For Rest Api Response.
 */
class NodeDataProvider implements NodeDataProviderInterface {

  /**
   * Prepared Data.
   *
   * @var array
   */
  private array $response;

  /**
   * Base Fields Defenitions of Node.
   *
   * @var null|\Drupal\Core\Field\FieldDefinitionInterface[]
   */
  private array $baseFieldDefinitions;

  /**
   * Node instance. (\Drupal\node\NodeInterface)
   *
   * @var object
   */
  private object $node;

  /**
   * NodeDataProvider constructor.
   *
   * @param \Drupal\Core\Entity\EntityTypeManagerInterface $entityTypeManager
   *   EntityTypeManager instance.
   * @param \Drupal\Core\Entity\EntityFieldManagerInterface $entityFieldManager
   *   EntityFieldManager instance.
   * @param \Drupal\breakpoint\BreakpointManagerInterface $breakpointManager
   *   BreakpointManager instance.
   */
  public function __construct(
    protected EntityTypeManagerInterface $entityTypeManager,
    protected EntityFieldManagerInterface $entityFieldManager,
    protected BreakpointManagerInterface $breakpointManager,
  ) {
    $this->baseFieldDefinitions = $this->entityFieldManager->getBaseFieldDefinitions('node');
  }

  /**
   * {@inheritDoc}
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function loadNode(string $id): void {
    $this->node = $this->entityTypeManager->getStorage('node')->load($id);
  }

  /**
   * {@inheritDoc}
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  public function setNodeDataStructure(string $view_mode): void {
    $nid = $this->node->id();
    $field_definitions = $this->entityFieldManager->getFieldDefinitions('node', $this->node->getType());
    foreach ($this->baseFieldDefinitions as $field) {
      if ($field_value = $this->node->get($field->getName())->value) {
        $this->response[$nid]['base_fields'][$field->getName()] = $field_value;
      }
    }
    foreach ($field_definitions as $field => $field_definition) {
      if (!isset($this->baseFieldDefinitions[$field])) {
        if (!empty($this->node->$field->view($view_mode))) {
          switch ($field_definition->getType()) {
            case 'entity_reference':
              if ($this->node->get($field)->entity->getEntityTypeId() == 'media') {
                $this->setMediaField($field, $view_mode);
              }
              break;

            case 'text_with_summary' or 'text':
            default:
              $this->setTextField($field);
              break;
          }
        }
      }
    }
  }

  /**
   * Set Text Field value for result array.
   *
   * @param string $field
   *   Field Name.
   */
  private function setTextField(string $field): void {
    $this->response[$this->node->id()]['config_fields'][$field] = $this->node->get($field)->value;
  }

  /**
   * Set responsive image attributes (srcset) for Image Media fields.
   *
   * Set Image Field Value for result array.
   *
   * @param string $field
   *   Field Name.
   * @param string $view_mode
   *   Selected view mode.
   *
   * @throws \Drupal\Component\Plugin\Exception\InvalidPluginDefinitionException
   * @throws \Drupal\Component\Plugin\Exception\PluginNotFoundException
   */
  private function setMediaField(string $field, string $view_mode): void {
    $media_field = $this->node->get($field)->entity->getSource()->getConfiguration()['source_field'];
    $media_storage = $this->entityTypeManager->getStorage('media');
    $image = $media_storage->load($this->node->get($field)->target_id);
    $responsive_image_style_id = $image->get($media_field)
      ->view($view_mode)[0]['#responsive_image_style_id'];

    if (!$responsive_image_style_id) {
      \Drupal::logger('responsive_image')->log(RfcLogLevel::ERROR, 'Failed to load responsive image style: “@style“ while displaying responsive image.', ['@style' => $responsive_image_style_id]);
      return;
    }

    $variables = [
      'uri' => $this->node->get($field)->entity->$media_field->entity->getFileUri(),
      'attributes' => [
        'alt' => $this->node->get($field)->entity->$media_field->alt,
      ],
      'responsive_image_style_id' => $responsive_image_style_id,
    ];

    $responsive_image_style = ResponsiveImageStyle::load($responsive_image_style_id);
    $breakpoints = array_reverse($this->breakpointManager->getBreakpointsByGroup($responsive_image_style->getBreakpointGroup()));
    foreach ($responsive_image_style->getKeyedImageStyleMappings() as $breakpoint_id => $multipliers) {
      if (isset($breakpoints[$breakpoint_id])) {
        $attributes = _responsive_image_build_source_attributes($variables, $breakpoints[$breakpoint_id], $multipliers);
        $this->response[$this->node->id()]['config_fields'][$field][] = $attributes->toArray();
      }
    }
  }

  /**
   * {@inheritDoc}
   */
  public function getStructuredData(): array|null {
    return $this->response;
  }

}
