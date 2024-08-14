import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, TextInput, FlatList,  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Task {
  id: number;
  name: string;
  description: string;
  status: boolean;
}


const App = () => {
  const [show, setShow] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filterStatus, setFilterStatus] = useState<'all' | 'completed' | 'pending'>('all');

  const addTask = (name: string, description: string, status: boolean) => {
    const newTask: Task = {
      id: tasks.length + 1,
      name,
      description,
      status,
    };
    setTasks([...tasks, newTask]);
  };

  const deleteTask = (id: number) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const updateTaskStatus = (id: number, newStatus: boolean) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  const filterTasks = () => {
    switch (filterStatus) {
      case 'completed':
        return tasks.filter(task => task.status);
      case 'pending':
        return tasks.filter(task => !task.status);
      default:
        return tasks;
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <NavBar setShow={setShow} />
      <FilterButtons setFilterStatus={setFilterStatus} />
      {show && <NewTaskWindow setShow={setShow} addTask={addTask} />}
      <FlatList
        data={filterTasks()}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => 
        <ItemList 
          id={item.id}
          name={item.name} 
          description={item.description} 
          status={item.status}
          deleteTask={deleteTask}
          updateTaskStatus={updateTaskStatus}  // Pass the update function here
        />
        }
      />
    </View>
  );
};

const NavBar: React.FC<{ setShow: (show: boolean) => void }> = ({ setShow }) => (
  <View style={styles.navBarContainer}>
    <Text style={styles.text}>TodoApp</Text> 
    <Pressable onPress={() => setShow(true)}>
      <Icon name="plus-square" size={30} />
    </Pressable>
  </View>
);

const NewTaskWindow: React.FC<{ setShow: (show: boolean) => void; addTask: (name: string, description: string, status: boolean) => void; }> = ({ setShow, addTask }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const status = false;

  const handleCreate = () => {
    addTask(name, description, status);
    setShow(false);
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.newTaskModal}>
        <View style={styles.newTaskHeader}>
          <Text style={styles.newTaskTitle}>Nueva Tarea</Text>
          <Pressable onPress={() => setShow(false)}>
            <Icon name="close" size={30} />
          </Pressable>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Nombre"
          onChangeText={setName}
          value={name}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Descripción"
          onChangeText={setDescription}
          value={description}
        />
        <Pressable style={styles.newTaskButton} onPress={handleCreate}>
          <Text style={styles.buttonText}>Crear</Text>
        </Pressable>
      </View>
    </View>
  );
};

const ItemList: React.FC<{ id: number; name: string; description: string; status: boolean; deleteTask: (id: number) => void; updateTaskStatus: (id: number, newStatus: boolean) => void; }> = ({ id, name, description, status: initialStatus, deleteTask, updateTaskStatus }) => {
  const toggleCheckbox = () => {
    const newStatus = !initialStatus;
    updateTaskStatus(id, newStatus);
  };
  
  const statusText = initialStatus ? "Completado" : "Pendiente";

  return (
    <View style={styles.container}>
      <View>
        <Text style={[styles.text, initialStatus && styles.strikethrough]}>{name}</Text>
        <Text style={[styles.subtext, initialStatus && styles.strikethrough]}>{description}</Text>
        <Text style={initialStatus ? styles.statusTextTrue : styles.statusTextFalse}>{statusText}</Text>
      </View>
      <View style={styles.checkbuttons}>
        <Pressable onPress={() => deleteTask(id)}>
          <Icon
          style={styles.icon}
          name={"trash"}  
          color={"darkred"}
          size={30}       
          />
        </Pressable>
        <Pressable onPress={toggleCheckbox}>
          <Icon
            style={styles.icon}
            name={initialStatus ? "check-square" : "square"}
            size={30}
            color={initialStatus ? "green" : "gray"}
          />
        </Pressable>
      </View>
    </View>
  );
};

const FilterButtons: React.FC<{ setFilterStatus: (status: 'all' | 'completed' | 'pending') => void }> = ({ setFilterStatus }) => (
  <View style={styles.filterContainer}>
    <Pressable style={styles.filterButton} onPress={() => setFilterStatus('all')}>
      <Text style={styles.filterButtonText}>Todo</Text>
    </Pressable>
    <Pressable style={styles.filterButton} onPress={() => setFilterStatus('completed')}>
      <Text style={styles.filterButtonText}>Completadas</Text>
    </Pressable>
    <Pressable style={styles.filterButton} onPress={() => setFilterStatus('pending')}>
      <Text style={styles.filterButtonText}>Pendientes</Text>
    </Pressable>
  </View>
);

const styles = StyleSheet.create({
  navBarContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  newTaskModal: {
    backgroundColor: 'lightgray',
    width: 300,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 50,
  },
  newTaskHeader: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  newTaskTitle: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  newTaskButton: {
    backgroundColor: 'green',
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
  },
  textInput: {
    height: 40,
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  subtext: {
    color: 'gray',
  },
  statusTextFalse:{
    color: 'red',
    fontWeight: 'bold',
  },
  statusTextTrue:{
    color: 'green',
    fontWeight: 'bold',
  },
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  checkbuttons: {
    flexDirection: 'row',
  },
  icon: {
    marginHorizontal: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'lightgray',
  },
  filterButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  filterButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 15,
  }
});

export default App;
