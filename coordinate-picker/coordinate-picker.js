/*
javascript:
var formats = ["{coord} ","{image} {NL} {index} {coord} {owner} {points} {tag} {tribename} {kk} {x} {y} {tribepoints} {ownerid} {villageid} {tribeid}"];
$.getScript("https://https://raw.githubusercontent.com/slowtarget/tribalwars/develop/coordinate-picker/coordinate-picker.js"); 
void(0);
*/
const formats = ["{coord} ","{image} {NL} {index} {coord} {owner} {points} {tag} {tribename} {kk} {x} {y} {tribepoints} {ownerid} {villageid} {tribeid}"];
if (formats === undefined) { var formats = ["K{kk} [coord]{coord}[/coord] {points}{NL\}"]; }
const win = (window.frames.length > 0) ? window.main : window;
const index = 0;
const outputID = 'villageList';
$(document).ready(function () {
    if ($('#' + outputID).length <= 0) {
        if (game_data.screen == 'map') {
            const wrapperHTML = "<div id='coord_picker'><span style='color:blue;text-decoration:underline;'>dalesmckay's co-ordinate picker v7.1:</span><br/><br/><div id ='{outputId}'></div></div>"
                .replace("{outputId\}", outputID);
            const innerHTML = '<label for="list_{i}">{format}</label><textarea name="list_{i}" id="{outputID}_{i}" cols="40" rows="10" value="" onFocus="this.select();"/>'
            ele = win.$('#map_config').append(win.$(wrapperHTML));
            let div = document.getElementById(outputID);

            formats.forEach((format,i)=>{
                let formatDiv = document.createElement("div");
                $(formatDiv).append(innerHTML
                    .replace("{i\}", i)
                    .replace("{format\}", format));
                div.append(formatDiv);
            });
            
            win.TWMap.map._handleClick = function (e) {
                index++;
                const pos = this.coordByEvent(e);
                const x = pos[0];
                const y = pos[1];
                const coordidx = x * 1000 + y,
                const village = TWMap.villages[coordidx];
                const owner = village.owner == 0 ? undefined : TWMap.players[village.owner];
                const tribeId = owner ? owner.ally : undefined;
                const tribe = tribeId ? TWMap.allies[tribeId] : undefined;
                console.log(pos,village,owner,tribe);
                const values = {
                    coord: pos.join("|"),
                    player: village.owner !== 0 ? TWMap.players[village.owner] : "",
                    playerpoints: 0,
                    playerid: village.owner,
                    villageid: village.id,
                    points: village.points.replace(".", ""),
                    tag: tribe ? tribe.tag : "",
                    tribename: tribe ? tribe.name : "",
                    tribepoints: tribe ? tribe.points : 0,                    
                    tribeId : tribeId ? tribeId : "",
                    x,
                    y,
                    kk: TWMap.con.continentByXY(x, y),
                    image: 'http://' + document.URL.split('/')[2] + '/graphic/' + (village.bonus ? village.bonus[1] : ""),
                    index,
                    NL: "\n"
                };

                const render_value = function(input, key, value){
                    return input.replace("{" + key + "\}", value);
                };

                const render_template = function(template, values) {
                    let output = template;
                    Object.getOwnPropertyNames(values).forEach(key => render_value(output, key, values[key]));
                    return output;
                };

                formats.forEach((format,i)=>{                                  
                    document.getElementById(outputID + "_" + i).innerHTML += render_template(format, values) ;
                });
                
                return false;
            };
        } else {
            alert("Run this script from the Map.\nRedirecting now...");
            self.location = win.game_data.link_base_pure.replace(/screen\=\w*/i, "screen=map");
        }
    }
});
void (0);