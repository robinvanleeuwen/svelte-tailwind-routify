<script>
import AdminForm from "../components/AdminForm.svelte";
</script>
<h3>Users</h3>
<hr>
<div class="main-grid bg-gray-700 text-black">
    <div>Select User</div>
    <div><AdminForm /></div>
</div>
<style>
    .main-grid {
        display: grid;
        grid-template-columns: 35% 50%;
    }

</style>