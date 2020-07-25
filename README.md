# Fun Javascript Canvas Animations

Free to use javascript animations. Visit our [settings tool](http://jscanvasanim.funtility.com) to customize the animation and generate the settings JSON to instantiate the animation.

## How To Use One Of Our Animations On Your Site

1. From this repository, download the [canvasAnimations.js](https://github.com/funtility/JavascriptCanvasAnimations/tree/master/scripts). And save it into your project.

2. Add the script tag in the header of your site. Change the path to where you saved the canvasAnimations.js as needed.

```
<script src="./scripts/canvasAnimations.js"></script>
```

3. Add a script tag after the body of your HTML to initialize the animation

```
<script>
    document.onload = funtilityCanvasAnimation();
</script>
```

4. Pass the settings JSON into the funtilityCanvasAnimation() function using the settings JSON created on out [settings tool]((http://javascriptanimations.funtility.com)). Or you may use the defaults by passing in only the minimum setting JSON which specifies the animation class you selected to display.

```
<script>
    document.onload = funtilityCanvasAnimation({
        "class": "Fluctuating_Hexagons"
        });
</script>
```


# Other Information

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/funtility/JavascriptCanvasAnimations/tags). 

## Authors

* **Nathan Hering** - [LinkedIn](https://www.linkedin.com/in/nathanhering/)

See also the list of [contributors](https://github.com/funtility/AnimatedBackgrounds/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
