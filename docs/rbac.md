# RBAC — Role-Based Access Control

## 1. Purpose

RBAC controls access to protected web and backend functionality based on user roles and permissions.

Authorization must be enforced server-side.

Frontend authorization is only used to control user experience.

---

# 2. Authorization Model

The system uses:

```text
User
  ↓
Role
  ↓
Permission
  ↓
Resource / Action
```

Example:

```text
Admin
 ├── blog.read
 ├── blog.create
 ├── blog.update
 ├── blog.delete
 ├── project.create
 ├── project.update
 └── project.delete
```

---

# 3. Roles

Initial roles:

| Role     | Description                   |
| -------- | ----------------------------- |
| `admin`  | Full administrative access    |
| `editor` | Manage content                |
| `author` | Create and manage own content |
| `viewer` | Read-only access              |

Roles should represent responsibility rather than individual users.

---

# 4. Permissions

Permissions use the format:

```text
resource.action
```

Examples:

```text
blog.read
blog.create
blog.update
blog.delete

project.read
project.create
project.update
project.delete

profile.read
profile.update

media.read
media.upload
media.delete

user.read
user.create
user.update
user.delete
```

---

# 5. Permission Naming

Permission names must be:

* lowercase
* stable
* resource-oriented
* action-oriented

Preferred:

```text
blog.create
blog.update
blog.delete
```

Avoid:

```text
canManageBlog
isBlogAdmin
superBlogUser
```

---

# 6. Authorization Matrix

Example:

| Permission       | Admin | Editor | Author | Viewer |
| ---------------- | ----: | -----: | -----: | -----: |
| `blog.read`      |     ✓ |      ✓ |      ✓ |      ✓ |
| `blog.create`    |     ✓ |      ✓ |      ✓ |      - |
| `blog.update`    |     ✓ |      ✓ |    own |      - |
| `blog.delete`    |     ✓ |      ✓ |    own |      - |
| `project.create` |     ✓ |      ✓ |      - |      - |
| `project.update` |     ✓ |      ✓ |      - |      - |
| `project.delete` |     ✓ |      ✓ |      - |      - |
| `profile.update` |     ✓ |      - |      - |      - |
| `user.manage`    |     ✓ |      - |      - |      - |

"own" means the permission is additionally restricted by resource ownership.

---

# 7. RBAC vs Ownership

RBAC alone is insufficient for resources that belong to individual users.

Example:

```text
Author A
   ↓
Blog Post A
```

Author A may update:

```text
Blog Post A
```

but not:

```text
Blog Post B
```

Authorization becomes:

```text
Role permission
+
Resource ownership
```

---

# 8. Authorization Decision

Conceptually:

```text
Can(user, action, resource)?
```

Example:

```text
Can(
  user,
  "blog.update",
  post
)
```

The decision should consider:

1. authentication
2. role
3. permission
4. resource ownership
5. resource state
6. contextual policy when required

---

# 9. Frontend Authorization

Frontend authorization is for UX.

Example:

```text
User lacks blog.delete
        ↓
Hide or disable Delete button
```

However:

```text
Hidden button ≠ security
```

The API must independently enforce authorization.

---

# 10. BFF Authorization

The BFF may perform authorization checks for web-specific routes.

Example:

```text
Browser
   ↓
BFF
   ↓
Require blog.update
   ↓
Backend API
```

The BFF should reject unauthorized requests before unnecessary downstream operations.

---

# 11. Backend Authorization

Backend APIs remain the authoritative security enforcement point.

Example:

```text
DELETE /api/v1/blog/posts/{id}

Authentication
      ↓
Authorization
      ↓
blog.delete
      ↓
Ownership / policy
      ↓
Delete
```

Never trust authorization decisions supplied by the browser.

---

# 12. Authentication vs Authorization

Authentication answers:

```text
Who are you?
```

Authorization answers:

```text
What are you allowed to do?
```

They must remain separate concepts.

---

# 13. Role Assignment

Role assignment must be controlled.

Users must not be able to assign themselves privileged roles.

For example, this must never be accepted from an untrusted client:

```json
{
  "role": "admin"
}
```

without server-side authorization.

---

# 14. Privileged Roles

High-privilege roles require additional protection.

Examples:

```text
admin
superadmin
```

Consider:

* MFA
* stronger session controls
* audit logging
* shorter session lifetime
* IP restrictions where appropriate
* privileged action confirmation

---

# 15. Permission Evaluation

Prefer permission checks over role-name checks.

Prefer:

```text
hasPermission("blog.delete")
```

over:

```text
role === "admin"
```

This allows roles to evolve without rewriting authorization logic.

---

# 16. Role Hierarchy

Do not introduce role inheritance unless required.

Avoid creating complex hierarchies such as:

```text
superadmin
   ↓
admin
   ↓
editor
   ↓
author
   ↓
viewer
```

unless the product actually requires them.

Prefer explicit role-to-permission mappings.

---

# 17. API Contract

Protected APIs should document required permissions.

Example:

```text
DELETE /api/v1/blog/posts/{id}

Required permission:
blog.delete
```

---

# 18. Error Responses

Unauthenticated:

```http
401 Unauthorized
```

Authenticated but unauthorized:

```http
403 Forbidden
```

Do not expose sensitive authorization details in error responses.

---

# 19. Caching

Authorization-sensitive responses must not be incorrectly shared between users.

Do not use shared caches for responses containing user-specific permissions or sensitive data unless the cache key and policy are explicitly designed for it.

---

# 20. Permission Changes

Permission changes should take effect according to the session/cache policy.

If permissions are cached, define:

* cache duration
* invalidation strategy
* revocation behavior
* privileged-role handling

---

# 21. Audit Logging

Log security-sensitive authorization events where appropriate:

```text
role.assigned
role.removed
permission.changed
privileged.action
authorization.denied
```

Do not log passwords, tokens, or sensitive credentials.

---

# 22. Default Deny

Authorization follows:

```text
default = deny
```

If a permission is not explicitly granted, access is denied.

---

# 23. Fail Securely

If authorization infrastructure fails, protected operations should fail closed.

Do not convert:

```text
permission service unavailable
```

into:

```text
allow
```

---

# 24. Testing

Test:

### Authentication

* anonymous user
* authenticated user

### Authorization

* correct permission
* missing permission
* wrong role
* ownership violation
* privileged operation

### Security

* privilege escalation
* role manipulation
* IDOR
* authorization bypass
* stale permission cache

---

# 25. Definition of Done

RBAC is complete when:

* roles are documented
* permissions are documented
* authorization matrix exists
* backend enforcement exists
* BFF enforcement is defined
* frontend only provides UX-level authorization
* default deny is implemented
* ownership rules are defined
* privileged operations are protected
* authorization tests exist
* audit requirements are defined
