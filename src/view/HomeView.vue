<template>
    <div>
        <works-component></works-component>
        <sphere-component></sphere-component>
    </div>
</template>
<script>
    import SphereComponent from '../components/SphereComponent';
    import WorksComponent from '../components/WorksComponent';

    export default {
        name: 'HomeView',
        components: {
            SphereComponent,
            WorksComponent,
        },
        data() {
            return {};
        },
    };
</script>

