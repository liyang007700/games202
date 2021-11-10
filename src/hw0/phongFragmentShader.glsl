#ifdef GL_ES
precision mediump float;
#endif
uniform sampler2D map;
uniform vec3 uLightPos;
uniform vec3 uCameraPos;
// uniform float uLightIntensity;

varying highp vec2 vUv;
varying highp vec3 vFragPos;
varying highp vec3 vNormal;

void main(void) {
  vec3 color = pow(texture2D(map, vUv).rgb, vec3(2.2));
  
  vec3 ambient = 0.05 * color;

  vec3 lightDir = normalize(uLightPos - vFragPos);
  vec3 normal = normalize(vNormal);
  float diff = max(dot(lightDir, normal), 0.0);
  float light_atten_coff = 1.0 / length(uLightPos - vFragPos);
  vec3 diffuse =  diff * light_atten_coff * color;

  vec3 viewDir = normalize(uCameraPos - vFragPos);
  float spec = 0.0;
  vec3 reflectDir = reflect(-lightDir, normal);
  spec = pow (max(dot(viewDir, reflectDir), 0.0), 35.0);
  vec3 specular = light_atten_coff * spec;  
  
  gl_FragColor = vec4(pow((ambient + diffuse + specular), vec3(1.0/2.2)), 1.0);

}