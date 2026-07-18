/**
 * Message model placeholder.
 *
 * When a database is added (e.g. MongoDB, PostgreSQL), define the
 * schema/model here and export it for use in controllers and services.
 *
 * Example fields:
 *   - id:        string  (UUID)
 *   - role:      'user' | 'assistant'
 *   - content:   string
 *   - createdAt: Date
 *   - sessionId: string  (optional)
 */

export class Message {
  constructor({ id, role, content, createdAt = new Date() }) {
    this.id = id;
    this.role = role;
    this.content = content;
    this.createdAt = createdAt;
  }
}

export default Message;
