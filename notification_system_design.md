# Phase I

## REST APIs

### Get Notifications

GET /api/v1/notifications

Response:

```json
{
  "success": true,
  "notifications": []
}
```

### Mark Read Notification

PATCH /api/v1/notifications/{id}/read

### Delete Notification

DELETE /api/v1/notifications/{id}

### Push Notification Service

WebSocket will be used to send notifications to connected students instantly.

# Phase II

## Database Selection

Postgres

Reasons:

* ACID compliant
* Trustworthiness
* Indexing  support
* Scalability

### Notifications Table

```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY,
  student_id BIGINT,
  notification_type VARCHAR(20),
  message TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP
);
```

# Phase III

Slow Query:

```sql
SELECT *
FROM notifications
WHERE studentID = 1042
AND isRead = false
ORDER BY createdAt DESC;
```

Reason:

* Full table scan on millions of rows.

Optimization:

```sql
CREATE INDEX idx_student_read_created
ON notifications(student_id, is_read, created_at DESC);
```

Notifications on Last 7 Days Placement:

```sql
SELECT DISTINCT student_id
FROM notifications
WHERE notification_type='Placement'
AND created_at >= NOW() - INTERVAL '7 days';
```

# Phase IV

Performance Enhancements:

* Redis Cache
* Pagination
* Push WebSocket 
* Reproductions Read 

# Phase V

Problems:

* Sequential processing
* Running slowly
* No retry mechanism
* Missing failure handling

Solution:

* Use Kafka or RabbitMQ
* Processing based on queues
* Resend failed emails

Pseudo-code:

```python
for student in students:
    publish_to_queue(student, message)
```

Consumer:

```python
save_to_db()
send_email()
push_notification()
```

# Phase VI

Priority Order:

Placement > Result > Event

Weights:

* Placement = 3rd
* Result = 2
* Event = 1

Use a Min Heap of size 10 to efficiently maintain the top 10 priority notifications.
