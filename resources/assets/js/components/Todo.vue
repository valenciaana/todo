<template>
    <div class="container">
        <div class="box">
            <todo-input
                @click="addTodo"
            ></todo-input>
        </div>
        <table class="table is-bordered">
            <todo-item
                v-for="todo in items"
                v-bind="todo"
                :key="todo.id"
            ></todo-item>
        </table>
    </div>
</template>

<script>
    /**
     * Tips:
     * - En mounted pueden obtener el listado del backend de todos y dentro de la promesa de axios asirnarlo
     *   al arreglo que debe tener una estructura similar a los datos de ejemplo.
     * - En addTodo, removeTodo y toggleTodo deben hacer los cambios pertinentes para que las modificaciones,
     *   addiciones o elimicaiones tomen efecto en el backend asi como la base de datos.
     */
    import TodoInput from './TodoInput.vue';
    import TodoItem from './TodoItem.vue';

    export default {
        data () {
            return {
                todoItemText: '',
                items: [],
            }
        },
        mounted () {
            this.mute = true;
            window.axios.get('/api/todos').then(({ data }) => {
                data.forEach(todo => {
                    this.items.push(todo);
                });
            this.mute = false;
            });
        },
        methods: {
            addTodo (todoItemText) {
                let text = todoItemText.trim()
                if (text !== '') {
                    var todo = {text:text,done:false};
                    window.axios.post('/api/todos', todo, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    })
                    this.items.push(todo)
                }
            },
            removeTodo (todo) {
                window.axios.delete(`/api/todos/${todo.id}`);
                this.items = this.items.filter(item => item !== todo)
            },
            toggleDone (todo) {
                window.axios.put(`/api/todos/${todo.id}`, todo);
                todo.done = !todo.done
            }
        },
        components: {
            TodoInput,
            TodoItem
        }
    }
</script>

<style>
    .is-done {
        text-decoration: line-through;
    }
</style>
