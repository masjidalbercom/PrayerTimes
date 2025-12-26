var startTime=moment("06:18:59 pm", "HH:mm:ss a");
var endTime=moment("06:40:07 pm", "HH:mm:ss a");
var duration = moment.duration(endTime.diff(startTime));
var hours = parseInt(duration.asHours());
var minutes = parseInt(duration.asMinutes())-hours*60;
alert (hours + ' hour and '+ minutes+' minutes.')
       
       var result = endTime.diff(startTime, 'hours') + " Hrs and " +     
                        endTime.diff(startTime, 'minutes') + " Mns";
alert(result)

