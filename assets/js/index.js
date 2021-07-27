$(document).ready(function(){
    $('button').on("click", function(e){
         e.preventDefault();
         let pokeInput = $('#pokeInput').val()

         $.ajax({
             url: "https://pokeapi.co/api/v2/pokemon/"+pokeInput,
             success: function(data){
                 let nombre =data.name
                 let imagen = data.sprites.front_default
                 let peso = data.weight

                 $("#pokeInfo").html(`
                    <div class="text-center">
                        <h3>${nombre}</h3>
                        <img src="${imagen}" alt="">
                        <h6>Peso: ${peso}</h6>
                </div>
                 `)
                let estadisticas = []
                
                data.stats.forEach(function(s){
                    estadisticas.push({
                        label: s.stat.name,
                        y: s.base_stat

                    })
                })
                let config = {
                    animationEnabled : true,
                    title: {
                        text: "Estadisticas"
                    },
                    axisY: {
                        title: "valor",
                    },
                    axisX: {
                        title: "Estadisticas"
                    },
                    data: [
                        {
                            type:"column",
                            dataPoints: estadisticas
                        }
                    ]

                }

                
                let chart = new CanvasJS.Chart("pokeStats", config);
                chart.render()
             }

         })
   });
});