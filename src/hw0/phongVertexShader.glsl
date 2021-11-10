varying vUv;
varying vNormal;
varying vFragPos;
void main(void) {
  vUv = uv;
  vNormal = normal;
  vFragPos = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

}