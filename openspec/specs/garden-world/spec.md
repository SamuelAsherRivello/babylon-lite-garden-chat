# garden-world Specification

## Purpose
Support the Garden Chat social experience through garden world with verifiable visitor behavior.

## Requirements

### Requirement: Bounded movement
Visitors SHALL move with WASD, arrow keys and touch controls, remain within the fence and bump into other visitors. The interior SHALL have no obstacles. Typing, pause and focus loss SHALL stop movement.

#### Scenario: Focus safety
- **WHEN** a visitor focuses chat while holding a movement key
- **THEN** movement stops and typed characters do not control the gardener

