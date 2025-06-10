import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';

export async function scheduleTaskNotification(taskText: string): Promise<string | undefined> {
    if (!Device.isDevice) {
        console.warn('Must use a physical device for push notifications');
        return;
    }

    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
        console.warn('Notification permissions not granted');
        return;
    }

    const content = {
        title: 'Task Reminder',
        body: `Time to complete: ${taskText}`,
    };

    // Option 1: Trigger after 60 seconds (better for development and testing)
    // const trigger = { seconds: 60, repeats: true };

    // Option 2: Trigger at a specific time (recommended for production)
    const trigger = new Date(Date.now() + 60 * 1000);

    try {
        const id = await Notifications.scheduleNotificationAsync({ content, trigger });
        return id;
    } catch (error) {
        console.error('Failed to schedule notification:', error);
        return;
    }
}

export async function cancelNotification(id: string) {
    try {
        await Notifications.cancelScheduledNotificationAsync(id);
    } catch (error) {
        console.warn('Failed to cancel notification:', error);
    }
}
