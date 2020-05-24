/*javascript:
var formats = ["{coord} ","{image} {NL} {index} {coord} {player} {points} {tag} {tribename} {kk} {x} {y} {tribepoints} {playerpoints} {playerid} {villageid} {tribeid}"];
$.getScript("https://ben.wtb.cc//maps.js"); 
void(0);
*/
if (formats === undefined) { var formats = ["K{kk} [coord]{coord}[/coord] {points}{NL\}"]; }
var win = (window.frames.length > 0) ? window.main : window;
var index = 0;
var outputID = 'villageList';
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
            });
            
            
            win.TWMap.map._handleClick = function (e) {
                index++;
                var pos = this.coordByEvent(e);
                var x = pos[0];
                var y = pos[1];
                var coord = pos.join("|");
                coordidx = x * 1000 + y,
                village = TWMap.villages[coordidx];
                var ownername, ownerpoints, tribetag, tribename, tribepoints, ownerally;
                if (village.owner == 0) {
                    ownername = "";
                    ownerpoints = 0;
                }
                else {
                    owner = TWMap.players[village.owner];

                    if (TWMap.allies[owner] > 0) {
                        ownerally = owner.ally;
                        tribe = TWMap.allies[ownerally];
                        tribetag = tribe.tag;
                        tribename = tribe.name;
                        tribepoints = tribe.points;
                    }
                    else {
                        tribe = "";
                        tribetag = "";
                        tribename = "";
                        tribepoints = "";
                        ownerally = 0;
                    }
                }
                var image = "";
                if (village.bonus) {
                    image = village.bonus[1];
                }

                var data = format.replace("{coord\}", coord)
                .replace("{player\}", ownername)
                .replace("{playerpoints\}", ownerpoints)
                .replace("{playerid\}", village.owner)
                .replace("{villageid\}", village.id)
                .replace("{points\}", village.points.replace(".", ""))
                .replace("{tag\}", tribetag)
                .replace("{tribename\}", tribename)
                .replace("{tribepoints\}", tribepoints)
                .replace("{tribeid\}", ownerally)
                .replace("{x\}", x)
                .replace("{y\}", y)
                .replace("{kk\}", TWMap.con.continentByXY(x, y))
                .replace("{image\}", 'http://' + document.URL.split('/')[2] + '/graphic/' + image)
                .replace("{index\}", index)
                .replace("{NL\}", "\n");
                
                document.getElementById(outputID).innerHTML += data;
                /* $('#' + outputID).value += data + "\n";*/
                return false;
            };
        } else {
            alert("Run this script from the Map.\nRedirecting now...");
            self.location = win.game_data.link_base_pure.replace(/screen\=\w*/i, "screen=map");
        }
    }
});
void (0);