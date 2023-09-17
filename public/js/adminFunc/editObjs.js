$(document).ready(function () {
    $("#area").submit(function (e) { 
        e.preventDefault();
        // <li cssType="width">
        //     <p>Width:</p>
        //     <input type="number" name="widthValue">
        //     <select name="widthMark" id="widthMark">
        //         <option value="%">%</option>
        //         <option value="px">px</option>
        //         <option value="vw">vw</option>
        //         <option value="vh">vh</option>
        //         <option value="vmin">vmin</option>
        //         <option value="vmax">vmax</option>
        //     </select>
        //     <div class="formFunc">
        //         <img src="imgs/other/IconDeleteStyle.png" alt="">
        //     </div>
        // </li>
        let li = $("<li>")
        let itemValue = this.items.value
        $(li).attr("cssSelector", itemValue);
        let name = $("<p>")
        $(name).text(itemValue);
        let div = $("<div>")
        $(li).append(name);
        if (itemValue == "width" || itemValue == "height"){
            let input = $("<input>")

        }
    });
});