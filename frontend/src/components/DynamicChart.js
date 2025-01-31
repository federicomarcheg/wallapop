import React, { Suspense } from 'react';

const Chart = React.lazy(() => import('./Chart'));

const DynamicChart = () => (
    <Suspense fallback={<div>Cargando grafico...</div>}>
        <Chart />  // Componente que renderiza el gráfico dinámico 
    </Suspense>
);



export default DynamicChart;