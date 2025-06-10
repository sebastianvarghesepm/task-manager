import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { Task } from '../types/Task';

interface Props {
    task: Task;
    onToggle: (id: string) => void;
    onDelete: (id: string) => void;
    onEdit: (task: Task) => void;
}

const priorityColors: Record<Task['priority'], string> = {
    high: '#ff6b6b',
    medium: '#f5a623',
    low: '#4caf50',
};

const TaskItem: React.FC<Props> = ({ task, onToggle, onDelete, onEdit }) => {
    return (
        <View
            style={[
                styles.taskItem,
                { borderLeftColor: priorityColors[task.priority] },
                task.completed && styles.completed,
            ]}
        >
            <TouchableOpacity style={styles.taskTextContainer} onPress={() => onToggle(task.id)}>
                <Text style={[styles.taskText, task.completed && styles.strike]}>
                    {task.text}
                </Text>
            </TouchableOpacity>

            <View style={styles.iconsContainer}>
                <TouchableOpacity onPress={() => onEdit(task)} style={styles.iconButton}>
                    <Feather name="edit" size={20} color="#007AFF" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => onDelete(task.id)} style={styles.iconButton}>
                    <MaterialIcons name="delete" size={24} color="tomato" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    taskItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        marginVertical: 6,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 2,
        borderLeftWidth: 6,
    },
    taskTextContainer: {
        flex: 1,
    },
    taskText: {
        fontSize: 16,
    },
    strike: {
        textDecorationLine: 'line-through',
        color: '#888',
    },
    completed: {
        backgroundColor: '#e0ffe0',
    },
    iconsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconButton: {
        marginLeft: 12,
    },
});

export default TaskItem;
