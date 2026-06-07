# Stage 1

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

### Mark Notification Read

PATCH /api/v1/notifications/{id}/read

### Delete Notification

DELETE /api/v1/notifications/{id}

### Real-Time Notification Mechanism

WebSocket will be used to push notifications instantly to connected students.

# Stage 2

## Database Choice

PostgreSQL

Reasons:

* ACID compliance
* Reliability
* Index support
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

# Stage 3

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

Placement Notifications in Last 7 Days:

```sql
SELECT DISTINCT student_id
FROM notifications
WHERE notification_type='Placement'
AND created_at >= NOW() - INTERVAL '7 days';
```

# Stage 4

Performance Improvements:

* Redis Cache
* Pagination
* WebSocket Push
* Read Replicas

# Stage 5

Problems:

* Sequential processing
* Slow execution
* No retry mechanism
* Failure handling missing

Solution:

* Use Kafka or RabbitMQ
* Queue-based processing
* Retry failed emails

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

# Stage 6

Priority Order:

Placement > Result > Event

Weights:

* Placement = 3
* Result = 2
* Event = 1

Use a Min Heap of size 10 to efficiently maintain the top 10 priority notifications.
