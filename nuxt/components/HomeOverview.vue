<template>
  <section id="overview">
    <div class="title-block gutter" ref="collide1">
      <h2 class="pad-t pre">{{ title }}</h2>
    </div>
    <svg ref="omoeba" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1000 1000" width="1000" height="1000" xml:space="preserve">
      <g>
        <path ref="outer" id="outer" d="" />
        <path ref="inner" id="inner" d="" />
      </g>
      <!-- NOTE: guides for dev
      <g>
        <line ref="line1" stroke="black"></line>
        <line ref="line2" stroke="black"></line>
        <line ref="line3" stroke="black"></line>
        <line ref="line4" stroke="black"></line>
        <line ref="line5" stroke="black"></line>
        <line ref="line6" stroke="black"></line>
        <line ref="line7" stroke="black"></line>
        <line ref="line8" stroke="black"></line>
        <line ref="line9" stroke="black"></line>
      </g> -->
    </svg>
    <div class="text-block" ref="collide2">
      <h3>{{ subtitle }}</h3>
      <div class="copy fs-p3">
        <p class="pre">{{ copy }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import { spline } from '@georgedoescode/spline';
import { createNoise2D } from 'simplex-noise';

// Globals
const omoeba = ref(null),
      outer = ref(null),
      inner = ref(null),
      line1 = ref(null),
      line2 = ref(null),
      line3 = ref(null),
      line4 = ref(null),
      line5 = ref(null),
      line6 = ref(null),
      line7 = ref(null),
      line8 = ref(null),
      line9 = ref(null),
      collide1 = ref(null),
      collide2 = ref(null),
      numSegments = 9,
      segment = 360 / numSegments,
      noise2d = createNoise2D();

let ctx = null,
    cp = {
      'x': 500,
      'y': 500
    },
    points = [],
    raf = null,
    scale = 1,
    constraints = [],
    noiseStep = 0.0042,
    noiseLoop = 0;

// Props
const props = defineProps({
  title: {
    type: String
  },
  subtitle: {
    type: String
  },
  copy: {
    type: String
  }
});

// Mounted
onMounted(() => {
  // Listen
  window.addEventListener('resize', onResize);

  // Kick the tires and light the fires
  setTimeout(() => {
    // Resize
    window.dispatchEvent(new Event('resize'));

    // Initial Points
    getPoints();

    // Render
    raf = requestAnimationFrame(render);

    // Random noise
    bringTheNoise();
  }, 0);
});

// Unmount
onBeforeUnmount(() => {
  // Remove resize event listener
  window.removeEventListener('resize', onResize);

  // Cancel render
  window.cancelAnimationFrame(raf);

  // Cancel noise loop
  clearTimeout(noiseLoop);
});

function getPoints() {
  for (let i = 1; i <= numSegments; i++) {

    const theta = i * segment,
          p = getPoint(theta, 380);

    points.push({
      'x': p.x,
      'y': p.y,
      'originX': p.x,
      'originY': p.y,
      'noiseOffsetX': Math.random() * 1000,
      'noiseOffsetY': Math.random() * 1000
    });
  }
}

function getPoint(rotation, amplitude) {
  // Triangulate
  let x = amplitude * Math.sin(rotation * (Math.PI / 180)) + cp.x,
      y = amplitude * Math.cos(rotation * (Math.PI / 180)) + cp.y;

  return {x, y};
}

function constrain(x, y) {
  let constrainedPoint = {x, y};

  // Check collisions and constrain
  const ip1 = lineIntersectsRect(cp.x, cp.y, x, y, constraints[0].x1, constraints[0].y1, constraints[0].x2, constraints[0].y2),
        ip2 = lineIntersectsRect(cp.x, cp.y, x, y, constraints[1].x1, constraints[1].y1, constraints[1].x2, constraints[1].y2);

  if(ip1) constrainedPoint = {'x': ip1.x, 'y': ip1.y};
  if(ip2) constrainedPoint = {'x': ip2.x, 'y': ip2.y};

  return constrainedPoint;
}

function lineIntersectsRect(x1, y1, x2, y2, rx1, ry1, rx2, ry2) {
  // Check each side of the rectangle
  let left = lineIntersectsLine(x1, y1, x2, y2, rx1, ry1, rx1, ry2);
  let right = lineIntersectsLine(x1, y1, x2, y2, rx2, ry1, rx2, ry2);
  let top = lineIntersectsLine(x1, y1, x2, y2, rx1, ry1, rx2, ry1);
  let bottom = lineIntersectsLine(x1, y1, x2, y2, rx1, ry2, rx2, ry2);

  // Return the first intersection point found
  if (left) return left;
  if (right) return right;
  if (top) return top;
  if (bottom) return bottom;

  // No intersection
  return null;
}

function lineIntersectsLine(x1, y1, x2, y2, x3, y3, x4, y4) {
  // Calculate the denominator
  let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

  // Lines are parallel
  if (den === 0) {
    return null;
  }

  // Calculate the intersection point
  let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den;
  let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den;

  // Check if the intersection point lies on both line segments
  if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
    return {
      x: x1 + t * (x2 - x1),
      y: y1 + t * (y2 - y1)
    };
  } else {
    return null;
  }
}

function updateConstraints() {
  constraints = [
    {
      x1: (collide1.value.getBoundingClientRect().left - omoeba.value.getBoundingClientRect().left) * scale,
      y1: (collide1.value.getBoundingClientRect().top - omoeba.value.getBoundingClientRect().top) * scale,
      x2: (collide1.value.getBoundingClientRect().right - omoeba.value.getBoundingClientRect().left) * scale,
      y2: (collide1.value.getBoundingClientRect().bottom - omoeba.value.getBoundingClientRect().top) * scale
    },
    {
      x1: (collide2.value.getBoundingClientRect().left - omoeba.value.getBoundingClientRect().left) * scale,
      y1: (collide2.value.getBoundingClientRect().top - omoeba.value.getBoundingClientRect().top) * scale,
      x2: (collide2.value.getBoundingClientRect().right - omoeba.value.getBoundingClientRect().left) * scale,
      y2: (collide2.value.getBoundingClientRect().bottom - omoeba.value.getBoundingClientRect().top) * scale
    }
  ];
}

function map(n, start1, end1, start2, end2) {
  return ((n - start1) / (end1 - start1)) * (end2 - start2) + start2;
}

function render() {
  // Loop
  raf = requestAnimationFrame(render);

  updateConstraints();

  for(let i = 0; i < points.length; i++) {
    const point = points[i];

    const nX = noise2d(point.noiseOffsetX, point.noiseOffsetX),
          nY = noise2d(point.noiseOffsetY, point.noiseOffsetY);

    const x = map(nX, -1, 1, point.originX - 80, point.originX + 80),
          y = map(nY, -1, 1, point.originY - 80, point.originY + 80);

    const constrained = constrain(x, y);

    point.noiseOffsetX += noiseStep;
    point.noiseOffsetY += noiseStep;

    point.x = constrained.x;
    point.y = constrained.y;

    // NOTE: guides for dev
    // if(i === 0) {
    //   line1.value.setAttribute('x1', cp.x);
    //   line1.value.setAttribute('y1', cp.y);
    //   line1.value.setAttribute('x2', constrained.x);
    //   line1.value.setAttribute('y2', constrained.y);
    // } else if(i === 1) {
    //   line2.value.setAttribute('x1', cp.x);
    //   line2.value.setAttribute('y1', cp.y);
    //   line2.value.setAttribute('x2', constrained.x);
    //   line2.value.setAttribute('y2', constrained.y);
    // } else if(i === 2) {
    //   line3.value.setAttribute('x1', cp.x);
    //   line3.value.setAttribute('y1', cp.y);
    //   line3.value.setAttribute('x2', constrained.x);
    //   line3.value.setAttribute('y2', constrained.y);
    // } else if(i === 3) {
    //   line4.value.setAttribute('x1', cp.x);
    //   line4.value.setAttribute('y1', cp.y);
    //   line4.value.setAttribute('x2', constrained.x);
    //   line4.value.setAttribute('y2', constrained.y);
    // } else if(i === 4) {
    //   line5.value.setAttribute('x1', cp.x);
    //   line5.value.setAttribute('y1', cp.y);
    //   line5.value.setAttribute('x2', constrained.x);
    //   line5.value.setAttribute('y2', constrained.y);
    // } else if(i === 5) {
    //   line6.value.setAttribute('x1', cp.x);
    //   line6.value.setAttribute('y1', cp.y);
    //   line6.value.setAttribute('x2', constrained.x);
    //   line6.value.setAttribute('y2', constrained.y);
    // } else if(i === 6) {
    //   line7.value.setAttribute('x1', cp.x);
    //   line7.value.setAttribute('y1', cp.y);
    //   line7.value.setAttribute('x2', constrained.x);
    //   line7.value.setAttribute('y2', constrained.y);
    // } else if(i === 7) {
    //   line8.value.setAttribute('x1', cp.x);
    //   line8.value.setAttribute('y1', cp.y);
    //   line8.value.setAttribute('x2', constrained.x);
    //   line8.value.setAttribute('y2', constrained.y);
    // } else if(i === 8) {
    //   line9.value.setAttribute('x1', cp.x);
    //   line9.value.setAttribute('y1', cp.y);
    //   line9.value.setAttribute('x2', constrained.x);
    //   line9.value.setAttribute('y2', constrained.y);
    // }
  }

  outer.value.setAttribute("d", spline(points, 1, true));
  inner.value.setAttribute("d", spline(points, 1, true));
}

function bringTheNoise() {
  let ww = window.innerWidth;

  noiseStep = (Math.random() / 1000) + (Math.random() / 1000) + (Math.random() / 1000);
  omoeba.value.style.transform = `translate(${Math.random() * 40 - 20}px, ${Math.random() * 40 - 20}px)`;
  inner.value.style.transform = `scale(0.96) translate(${(Math.random() * 16) - 8}px, ${(Math.random() * 16) - 8}px)`;

  noiseLoop = setTimeout(() => {
    bringTheNoise();
  }, (Math.random() * 3000) + 2000);
}

function onResize(e) {
  scale = 1000 / omoeba.value.getBoundingClientRect().width;
  updateConstraints();
}
</script>

<style lang='scss'>
section#overview {
  width: 100%;
  padding-bottom: span(2);
  overflow: hidden;

  .title-block {
    padding-bottom: span(0.255);
    display: flex;

    // NOTE: this is a guide for dev
    //border: 2px solid $green;
  }

  svg {
    width: span(12);
    height: auto;
    margin: span(-1) 0 0 span(1);
    display: flex;
    pointer-events: none;
    transition: transform 4s cubic-bezier(0.785, 0.135, 0.150, 0.860);

    // NOTE: this is a guide for dev
    //border: 2px solid $orange;

    #outer {
      fill: $orange;
    }

    #inner {
      fill: $white;
      transform-origin: 50% 50%;
      transition: transform $speed-666 linear;
    }
  }

  .text-block {
    width: calc(#{span(13)} - #{$space-s});
    margin: span(-1) auto 0px $space-s;
    padding: span(0.25) 0 0 0;
    display: flex;
    flex-direction: column;

    // NOTE: this is a guide for dev
    //border: 2px solid $green;

    .copy {
      p {
        margin-top: $space-m;
      }
    }
  }

  @include respond-to($small-tablet) {
    .text-block {
      width: auto;
      margin: span(-1) span(1) 0px span(1);
      padding: span(0.25) 0 0 span(2);
      display: flex;
      flex-direction: column;

      .copy {
        p {
          margin-top: $space-m;
        }
      }
    }
  }

  @include respond-to($tablet) {
    padding-bottom: span(1);

    .title-block {
      h2 {
        width: span(10);
      }
    }

    svg {
      width: span(10);
      margin: span(-1) 0 0 span(0);
    }

    .text-block {
      margin: span(-2) span(1) 0px span(6.75);
      padding: span(1) 0 0 span(0.25);
    }
  }

  @include respond-to($large-tablet) {
    svg {
      margin: span(-1) 0 0 span(0);
    }

    .text-block {
      margin: span(-2.5) span(1) 0px span(6.75);
    }
  }

  @include respond-to($desktop) {
    svg {
      width: span(8);
    }

    .text-block {
      margin: span(-7) span(1) 0px span(6.75);
      padding: span(4) 0 0 span(0.25);
    }
  }

  @include respond-to($average-desktop) {
    .title-block {
      h2 {
        width: span(8);
      }
    }
  }
}
</style>
