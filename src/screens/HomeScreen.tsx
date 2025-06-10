import React, { useEffect, useState } from 'react';
import {
    FlatList,
    Keyboard,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Alert,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import TaskItem from '../components/TaskItem';
import { Task, Priority } from '../types/Task';
import { loadTasks, saveTasks } from '../storage/taskStorage';
import { cancelNotification, scheduleTaskNotification } from '../utils/notifications';

const PRIORITIES: Priority[] = ['low', 'medium', 'high'];

const HomeScreen = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [text, setText] = useState('');
    const [priority, setPriority] = useState<Priority>('medium');

    // Editing state
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    useEffect(() => {
        (async () => {
            const stored = await loadTasks();
            setTasks(stored);
        })();
    }, []);

    useEffect(() => {
        saveTasks(tasks);
    }, [tasks]);

    const resetForm = () => {
        setText('');
        setPriority('medium');
        setEditingTask(null);
    };

    const addOrUpdateTask = async () => {
        if (!text.trim()) {
            Alert.alert('Empty Task', 'Please enter a task.');
            return;
        }

        if (editingTask) {
            // Update task
            setTasks((prev) =>
                prev.map((task) =>
                    task.id === editingTask.id
                        ? { ...task, text: text.trim(), priority }
                        : task
                )
            );
            resetForm();
        } else {
            // Add new task
            const id = Date.now().toString();
            const notificationId = await scheduleTaskNotification(text.trim());
            const newTask: Task = {
                id,
                text: text.trim(),
                completed: false,
                priority,
                notificationId,
            };
            setTasks((prev) => [newTask, ...prev]);
            resetForm();
            Keyboard.dismiss();
        }
    };

    const toggleTask = (id: string) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id
                    ? {
                        ...task,
                        completed: !task.completed,
                    }
                    : task
            )
        );

        const task = tasks.find((t) => t.id === id);
        if (task?.notificationId && !task.completed) {
            cancelNotification(task.notificationId);
        }
    };

    const deleteTask = (id: string) => {
        const task = tasks.find((t) => t.id === id);
        if (task?.notificationId) cancelNotification(task.notificationId);
        setTasks((prev) => prev.filter((t) => t.id !== id));
    };

    const startEditTask = (task: Task) => {
        setEditingTask(task);
        setText(task.text);
        setPriority(task.priority);
    };

    // Sort tasks by priority (high > medium > low)
    const sortedTasks = [...tasks].sort((a, b) => {
        const order = { high: 3, medium: 2, low: 1 };
        return order[b.priority] - order[a.priority];
    });

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>My Tasks</Text>

            <View style={styles.inputContainer}>
                <TextInput
                    value={text}
                    onChangeText={setText}
                    placeholder="Enter task"
                    style={styles.input}
                />

                {/* Priority selector */}
                <View style={styles.priorityContainer}>
                    {PRIORITIES.map((p) => (
                        <TouchableOpacity
                            key={p}
                            style={[
                                styles.priorityButton,
                                priority === p && styles.prioritySelected,
                            ]}
                            onPress={() => setPriority(p)}
                        >
                            <Text
                                style={
                                    priority === p
                                        ? styles.priorityTextSelected
                                        : styles.priorityText
                                }
                            >
                                {p.charAt(0).toUpperCase() + p.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <TouchableOpacity style={styles.addButton} onPress={addOrUpdateTask}>
                    <AntDesign
                        name={editingTask ? 'checkcircle' : 'pluscircle'}
                        size={30}
                        color="white"
                    />
                </TouchableOpacity>
            </View>

            <FlatList
                data={sortedTasks}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TaskItem
                        task={item}
                        onToggle={toggleTask}
                        onDelete={deleteTask}
                        onEdit={startEditTask}
                    />
                )}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: '#f5f5f5' },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    input: {
        flex: 1,
        padding: 12,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    priorityContainer: {
        flexDirection: 'row',
        marginHorizontal: 8,
    },
    priorityButton: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#aaa',
        marginHorizontal: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },
    prioritySelected: {
        backgroundColor: '#007AFF',
        borderColor: '#007AFF',
    },
    priorityText: {
        color: '#555',
    },
    priorityTextSelected: {
        color: 'white',
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 30,
    },
});

export default HomeScreen;
