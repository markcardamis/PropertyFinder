import * as React from "react";

function SvgIconCompass(props) {
  return (
    <svg width={32} height={22} fill="none" {...props}>
      <path fill="url(#IconCompass_svg__pattern0)" d="M0 0h32v22H0z" />
      <defs>
        <pattern
          id="IconCompass_svg__pattern0"
          patternContentUnits="objectBoundingBox"
          width={1}
          height={1}
        >
          <use
            xlinkHref="#IconCompass_svg__image0"
            transform="matrix(.02778 0 0 .04167 -1.306 -1.167)"
          />
        </pattern>
        <image
          id="IconCompass_svg__image0"
          width={148}
          height={80}
          xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAABQCAYAAAD/RVx2AAAGd0lEQVR4Ae2dS0ssORTH49tWu2+joA6IC0EQBDfiwsU4Mgtxo7jwAeJOF7rxk/kZBob5AuPc4dLcARkcH9fn1W7fz+HfM2lS1d12pTpVlTp1Ak1V0qkk55+fJ+lUVWzIffn8LiIMp6enjtp//OlnR5xq5Ldff3GY1tvb64jHKZLJpIvNzecLojFODee22qeAChNa12xfE7lFcVDADZJsM3soqQQfPStQDSYUwEB5lpEzQoGPYGKgmBEtBWrBxEBpyZnszF5gYqCSzYhn673CxEB5ljS5GXVgYqCSy4kny3VhQqHWrUPt7e15MpYzBauAH5isBCpYmbj0Wgr4BUmWa52HGhoakm0jfTz852/r7KsXJhjEC5vWdWs0DTIBEwMVTd9ZV6spmBgo67o2/AaZhImBCr//rKrRNEwMlFXdG25jgoCJgQq3D62pLSiYYKB1ywbWqE6wIRIkmIbHdYMIDFQQqlpYpoQpKJCkybwOJZUgfAwLJkjIQBEGCaaFCRMDxTAZV4A9lHFJ7SgwbM8krWagpBKEjlHBBAkZKEIgwZQoYWKgGCbjCvA6lHFJwy9QeiXUHPQ6Uy3rGKhaCln+vYQpapCkTDyHkkpoHq+vr8X+/r7Y3d3VvNJcdttggmWJ91CPj48CcMjP1dVV6VymuY/Ig5DNZsXOzo45QjRKshEmND+xQOVyObGxsSEeHh40utGZdXt7uwiVMzX4mK0wwfLEDnkjIyNieXnZd+9PT0+L+fl539f7vdBmmBIF1NPTkzg7O3P04+bmpujr63OkeYk0NjYKeKewg+0wQY/EeKjDw0NxdHQkXl9fSxy0trYKQKUbANPg4KDuZXXljwNMMDARQF1eXgp8Xl5eilCpPTs3NycmJyfVpA/Px8fHxdra2od5TH4JkOICE+wmD9Tb25uAd5IBm8Te3NzIaPGo46XCHOokSGikLetMDuEqRMgDdXBwIDB/UgOGPjWMjo6K1dVVNani+fr6ukDeMIKECSDFBSboQhqofD5fNhGH0YVCQZyfnzu42NraEj09PY40NTI8PCyQJ4ygwhRGfSbrIA0UvFO1AC+F4VCGVCr1ITBhDXVxhglakgUKwNzf30teyo7Pz89lE/SFhQUxMTFRlndpaUlr4l5WgMeEuMMEM0kCdXt7K46Pj2t248nJiUBeNbiHtf7+/lDWnCjARBYo9VedCkulc/cEfWxsTKysrJSyYqjDcBhkSKe7isXHafJdTQ9yHgpeB5NurwET94uLC0d2LCPgxu/s7KyYmZlxfGc6QgkmaEPq5jBu9Op4JwkHvFR3d7doaGgoJqXT6eIK+tTUlMxi/ChBQsGFwo1IpTqM1xFFgaSAAkzv7/r/XAvrVLh2YGCg1AeLi4ul86BOABK1QGbIw7qSfE7JTyfhxvHd3Z2fS31dQxEmCEHCQ+EenTrUNTc3C/lpamoqnSOtWhxPEHCoXwESQGHuhOebJCz1y8Il+FWABFBdXf/97PYrAl9nTgH28+a05JKorpRzz0anAHuo6LQnWTMDRbJbozOKgYpOe5I1M1AkuzU6oxio6LQnWTMDRbJbozOKgYpOe5I1WweUn6cF4tYzlG2MHCjcf1PDw0P158DVfHE+d9vo1iDOtlkH1PX/W+XEWdRabXfbyEDVUkzje+wvoIaTb7VfLlDzx/HcbaNbgzjaJNscuYdqa2uTbSke8/lr8e3Y+WavI0PMI7ANNqrBrYH6XdzOIwcK7r69vd2h219fc+L790tHGoUIbIJtaoDtPOSpihg47+zsLCvlzz9+J+Wp4JlgkztUst2dJ07xhtyXz/pP9QdgIZ66xCtN7pDJfBJ9/T+IT9msaG9Pld5MceezLY6lAfyawwQccyb3MIf2ZjKZMu9smx267bHmiU24fuw14N5qBx1RqTN0DdXJL19xCvJFAjxl6h7qddpoa97I51CqMB0dHcW/WjUt7PMwYIJngq0UgzUeSoqLv9qWlpbingP17NAry9M5Bg0TbMOcidIk3K2vdUChgRAcf8UQH/uI40VM7I2p7o/pNqSeuAQJZZgc5mAHPlhnwtIAZZCk/lYCJRuHDsDQEOTwIHc9QZ3YrILKK+FSw7CPVgMVtBgSJgq7ngStldfyrZqUe220iXwMkwkVy8tIJFAMUzkIplISBxTDZAqdyuUkCiiGqTIEJlMTAxTDZBKb6mWR/5UnQYIE/GuuOgimvvkX14UnonZ94LUAAAAASUVORK5CYII="
        />
      </defs>
    </svg>
  );
}

export default SvgIconCompass;
