#version 330
in vec3 Normal;
in vec2 TexCoord;
in vec3 FragPos;

// This is the proper way to set the color of the fragment, NOT using gl_FragColor.
layout (location=0) out vec4 FragColor;

uniform sampler2D ourTexture;
// Lighting parameters for ambient light, and a single point light w/ no attenuation.
uniform vec3 ambientColor;
uniform vec3 pointPosition;
uniform vec3 pointColor;
//declared a new uniform variable cameraposition
uniform vec3 cameraPosition;

const float shininess = 32.0;

void main() {
    vec3 norm = normalize(Normal);
    //Calculated the light vector by subtracting the light position pointPosition from the object position FragPos
    vec3 lightDir = normalize(pointPosition - FragPos);

    float cosineLight = max(dot(norm, lightDir), 0.0);

    // Compute the ambient and diffuse components.
    vec3 ambient = ambientColor;
    vec3 diffuse = cosineLight * pointColor;

    // Compute the specular component.
    vec3 viewDir = normalize(cameraPosition - FragPos);
    //calculated the reflection vector by reflecting
    //the negated light vector -light_vector across the normalized object normal norm.
    vec3 reflectDir = reflect(-lightDir, norm);
    //Computed the cosine factor by doing the dot product
    float cosine = dot(normalize(reflectDir), normalize(viewDir));
    //Computed the specular factor by raising the maximum of the cosine factor and 0 to the power of the shininess
    float specFactor = pow(max(cosine, 0.0), shininess);
    //Obtained specular component.
    vec3 specular = specFactor * pointColor;

    // Assemble the final fragment color.
    FragColor = vec4(diffuse + ambient + specular, 1.0) * texture(ourTexture, TexCoord);
}
