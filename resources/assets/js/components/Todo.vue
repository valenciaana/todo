<template>
    <div class="container">
        <div class="box">
            <todo-input
                @click="addTodo"
                @addTodo="addTodo"
            ></todo-input>
        </div>
        <table class="table is-bordered">
            <todo-item
                v-for="todo in items"
                v-bind="todo"
                :key="todo.id"
                @toggleDone="toggleDone"
                @removeTodo="removeTodo"
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
    import { mapState } from 'vuex';

    export default {
        computed: mapState([
            'items'
        ]),
        data () {
            return {
                todoItemText: '',
            }
        },
        mounted () {
            this.$store.dispatch('LOAD_TODOS')
        },
        methods: {
            addTodo (todoItemText) {
                let text = todoItemText.trim()
                if (text !== '') {
                    var todo = {text:text,done:false};
                    this.$store.dispatch('ADD_TODO', { todo: todo })
                }
            },
            removeTodo (todo) {
                window.axios.delete(`/api/todos/${todo.id}`);
                this.$store.dispatch('LOAD_TODOS')
            },
            toggleDone (todo) {
                window.axios.put(`/api/todos/${todo.id}`, todo);
                todo.done = !todo.done
                this.items.find(todo => todo.id === todo.id).done = todo.done;
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
