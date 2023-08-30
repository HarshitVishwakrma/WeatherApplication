const video = document.getElementById('background-video')
const source = document.getElementById('source');

const weather = document.getElementById('clouds').textContent.trim();

switch(weather){
 
    case 'Rain':
     source.src = 'https://static.videezy.com/system/resources/previews/000/004/947/original/Rainy_Road_4K_Living_Background.mp4';
    break ;

    case 'Clouds':
        source.src = 'https://static.videezy.com/system/resources/previews/000/046/343/original/timelapse_lake_and_mountain_with_cloudy_sky.mp4';
    break;

    case 'Haze':
        source.src = 'https://static.videezy.com/system/resources/previews/000/045/351/original/Seabirds_Sunset_Landscape.mp4';
    break;
    default : source.src = 'https://static.videezy.com/system/resources/previews/000/038/877/original/2_19_08_19.mp4'
 
   
}
video.load()





    
  
 

