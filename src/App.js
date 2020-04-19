import React, { useEffect, useState } from "react";
import { FlatList, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import api from './services/api';


export default function App() {

  const [repositorios, setRepositorios ] = useState([]);

  useEffect(() => {
    console.log('teste 1')
    api.get('/repositories').then(response => {
      setRepositorios(response.data);
    });

  }, []);

  async function handleLikeRepository(id) {
    console.log(`/repositories/${id}/like`)
    api.post(`/repositories/${id}/like`).then(response => {
      setRepositorios(repositorios.map(repo => {
        if (repo.id === id) {
          return response.data;
        }
        return repo;
      }));
    });
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={repositorios}
          keyExtractor={repositorio => repositorio.id}
          renderItem={({ item: repositorio }) => (
            <View style={styles.repositoryContainer}>
              <Text style={styles.repository}>{ repositorio.title }</Text>

              <View style={styles.techsContainer}>
                { repositorio.techs.map(tech => <Text key={tech} style={styles.tech}>{tech}</Text>)}
              </View>

              <View style={styles.likesContainer}>
                <Text style={styles.likeText} 
                      testID={`repository-likes-${repositorio.id}`}>
                      {repositorio.likes} curtidas
                </Text>
              </View>

              <TouchableOpacity 
                style={styles.button} 
                onPress={() => handleLikeRepository(repositorio.id)}
                testID={`like-button-${repositorio.id}`}>
                <Text style={styles.buttonText}>Curtir</Text>
              </TouchableOpacity>

            </View>
          )}
          >
          </FlatList>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#7159c1",
  },
  repositoryContainer: {
    marginBottom: 15,
    marginHorizontal: 15,
    backgroundColor: "#fff",
    padding: 20,
  },
  repository: {
    fontSize: 32,
    fontWeight: "bold",
  },
  techsContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  tech: {
    fontSize: 12,
    fontWeight: "bold",
    marginRight: 10,
    backgroundColor: "#04d361",
    paddingHorizontal: 10,
    paddingVertical: 5,
    color: "#fff",
  },
  likesContainer: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  likeText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "bold",
    marginRight: 10,
    color: "#fff",
    backgroundColor: "#7159c1",
    padding: 15,
  },
});
