# Spec Delta

## Purpose
Support the Garden Chat social experience through multiplayer session with verifiable visitor behavior.

## ADDED Requirements

### Requirement: Joining and recovery
The experience SHALL join the isolated garden room, show occupancy and connection status, and support explicit leave and fresh retry without resetting other visitors.

#### Scenario: Hot join and drop
- **WHEN** two independent visitors join and one leaves
- **THEN** the remaining visitor sees presence appear and disappear
