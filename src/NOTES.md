# NOTES

useLazyQuery

```javascript
const [addTodo] = useMutation(ADD_TODO, {
  update(cache, { data: { addTodo } }) {
    const { todos } = cache.readQuery({ query: GET_TODOS });
    cache.writeQuery({
      query: GET_TODOS,
      data: { todos: todos.concat([addTodo]) },
    });
  },
});
```

Look into using fragments....
