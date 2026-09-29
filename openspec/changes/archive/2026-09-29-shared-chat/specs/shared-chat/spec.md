# Spec Delta

## Purpose
Support the Garden Chat social experience through shared chat with verifiable visitor behavior.

## ADDED Requirements

### Requirement: Shared session history
Visitors SHALL exchange plain-text messages in one scrollable shared chat. Late joiners SHALL receive the latest 100 session messages. Reading earlier messages SHALL preserve scroll position when new messages arrive.

#### Scenario: Late arrival
- **WHEN** a visitor joins after a message was sent
- **THEN** the earlier message appears with its author and timestamp
