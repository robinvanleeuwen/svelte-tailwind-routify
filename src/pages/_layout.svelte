<script>
    import {url} from '@sveltech/routify';
</script>
<div class="main">
    <div class="text-xs bg-gray-700 h-screen pt-4 text-center">
        <div class="text-white mb-2"><a href={$url("/")} title="hello">Home</a></div>
        <div class="text-white"><a href={$url("./About")} title="about">About</a></div>
    </div>
    <div class="ml-2"><slot /></div>
</div>
<style>
    .main {
        display: grid;
        grid-template-columns: 100px auto;
    }
    @tailwind base;
    @tailwind components;
    @tailwind utilities;

</style>